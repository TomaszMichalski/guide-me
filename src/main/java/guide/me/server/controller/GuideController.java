package guide.me.server.controller;

import guide.me.server.exception.BadRequestException;
import guide.me.server.exception.ResourceNotFoundException;
import guide.me.server.model.*;
import guide.me.server.payload.ApiResponse;
import guide.me.server.payload.UserCategoryRequest;
import guide.me.server.payload.UserSetStartingPointRequest;
import guide.me.server.repository.PlaceRepository;
import guide.me.server.repository.StartingPointRepository;
import guide.me.server.repository.UserRepository;
import guide.me.server.util.UserProvidedAddressFixer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class GuideController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private StartingPointRepository startingPointRepository;

    @Autowired
    private UserProvidedAddressFixer addressFixer;

    @RequestMapping("/guide/places")
    public Set<PlaceDto> getGuidePlaces() {
        Set<PlaceDto> placeDtos = new HashSet<>();

        placeRepository.findAll()
                .forEach(place -> placeDtos.add(new PlaceDto(place, place.getCategory(), null)));

        return placeDtos;
    }

    @RequestMapping("users/{userId}/categories")
    public Set<Category> getUserCategories(@PathVariable(name = "userId") Long userId) {
        return userRepository.findById(userId)
                .map(User::getCategories)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }

    @RequestMapping("users/{userId}/starting-points")
    public Set<StartingPoint> getUserStartingPoints(@PathVariable(name = "userId") Long userId) {
        return userRepository.findById(userId)
                .map(User::getStartingPoints)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }

    @Transactional
    @PostMapping("users/{userId}/starting-points")
    public ResponseEntity<?> setUserStartingPoint(@Valid @RequestBody UserSetStartingPointRequest userSetStartingPointRequest) {

        Long rqUserId = userSetStartingPointRequest.getUserId();
        String rqStartingPointAddress = userSetStartingPointRequest.getAddress();

        User user = userRepository.findById(rqUserId).orElseThrow(() -> new BadRequestException("No user with that id"));

        rqStartingPointAddress = addressFixer.getFixedAddress(rqStartingPointAddress);

        if(rqStartingPointAddress == null){
            throw new BadRequestException("Wrong address!");
        }

        StartingPoint startingPoint = new StartingPoint();
        startingPoint.setAddress(rqStartingPointAddress);
        startingPoint.setActive(true);
        startingPoint.setUser(user);

        Optional<StartingPoint> optionalStartingPoint = startingPointRepository.findByUser(user);

        if(optionalStartingPoint.isPresent()) {
            startingPointRepository.deleteByUser(user);
        }

        StartingPoint result = startingPointRepository.save(startingPoint);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("api/users/" + rqUserId + "/starting-points")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Starting point set successfully!"));
    }

    @RequestMapping("users/{userId}/categories/{categoryId}/places")
    public Set<Place> getUserPlaces(@PathVariable(name = "userId") Long userId,
                                    @PathVariable(name = "categoryId") Long categoryId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId))
                .getCategories()
                .stream()
                .filter(category -> categoryId.equals(category.getId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId))
                .getPlaces();
    }

    @PostMapping("users/{userId}/categories")
        public ResponseEntity<?> addUserCategory(@Valid @RequestBody UserCategoryRequest userCategoryRequest) {

        Long rqUserId = userCategoryRequest.getUserId();
        Category rqUserCategory = userCategoryRequest.getCategory();

        User user = userRepository.findById(rqUserId).orElseThrow(() -> new BadRequestException("No user with that id"));
        Set<Category> userCategories = user.getCategories();

        System.out.println(rqUserCategory);
        if(userCategories.contains(userCategoryRequest.getCategory())){
            throw new BadRequestException("User already has that category!");
        }

        userCategories.add(rqUserCategory);

        userRepository.save(user);

        return ResponseEntity.ok()
                .body(new ApiResponse(true, "Category added successfully!"));
    }

    @DeleteMapping("users/{userId}/categories")
    public ResponseEntity<?> removeUserCategory(@Valid @RequestBody UserCategoryRequest userCategoryRequest) {

        Long rqUserId = userCategoryRequest.getUserId();
        Category rqUserCategory = userCategoryRequest.getCategory();

        User user = userRepository.findById(rqUserId).orElseThrow(() -> new BadRequestException("No user with that id"));
        Set<Category> userCategories = user.getCategories();

        Set<Category> newCategories = userCategories.stream()
                .filter(category -> !category.getId()
                        .equals(rqUserCategory.getId()))
                .collect(Collectors.toSet());

        user.setCategories(newCategories);

        userRepository.save(user);

        return ResponseEntity.ok()
                .body(new ApiResponse(true, "Category added successfully!"));
    }

}
