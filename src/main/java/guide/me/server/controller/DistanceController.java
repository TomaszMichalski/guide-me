package guide.me.server.controller;

import guide.me.server.distance.DistanceProvider;
import guide.me.server.model.Distance;
import guide.me.server.model.Place;
import guide.me.server.repository.PlaceRepository;
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
    private DistanceProvider distanceProvider;

    @Autowired
    private UserProvidedAddressFixer addressFixer;

    @RequestMapping("/distance/{placeId}")
    public Distance distance(@PathVariable(name = "placeId") Long placeId,
                             @RequestParam(value = "addressFrom") String addressFrom) {
        Place placeTo = placeRepository.findById(placeId).get();

        addressFrom = addressFixer.getFixedAddress(addressFrom);

        return new Distance(addressFrom, placeTo,
                distanceProvider.getDistance(addressFrom, placeTo.getAddress()));
    }
}
