package guide.me.server.controller;

import guide.me.server.distance.DistanceProvider;
import guide.me.server.exception.ResourceNotFoundException;
import guide.me.server.model.Distance;
import guide.me.server.model.Place;
import guide.me.server.model.StartingPoint;
import guide.me.server.repository.PlaceRepository;
import guide.me.server.repository.UserRepository;
import guide.me.server.util.UserProvidedAddressFixer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DistanceController {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DistanceProvider distanceProvider;

    @Autowired
    private UserProvidedAddressFixer addressFixer;

    @RequestMapping("/distance/{placeId}")
    public Distance distance(@PathVariable(name = "placeId") Long placeId,
                             @RequestParam(value = "addressFrom") String addressFrom) {
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new ResourceNotFoundException("Place", "id", placeId));

        addressFrom = addressFixer.getFixedAddress(addressFrom);

        return new Distance(addressFrom, place,
                distanceProvider.getDistance(addressFrom, place.getAddress()));
    }

    @RequestMapping("/distance/{placeId}/{userId}")
    public Distance distanceForUser(@PathVariable(name = "placeId") Long placeId,
                                    @PathVariable(name = "userId") Long userId) {
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new ResourceNotFoundException("Place", "id", placeId));

        StartingPoint startingPoint = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId))
                .getStartingPoints()
                .stream()
                .filter(StartingPoint::isActive)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("StartingPoint", "active", true));

        String activeStartingPointAddress = startingPoint.getAddress();
        activeStartingPointAddress = addressFixer.getFixedAddress(activeStartingPointAddress);

        return new Distance(activeStartingPointAddress, place,
                distanceProvider.getDistance(activeStartingPointAddress, place.getAddress()));
    }
}
