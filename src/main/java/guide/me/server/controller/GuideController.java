package guide.me.server.controller;

import guide.me.server.exception.BadRequestException;
import guide.me.server.exception.ResourceNotFoundException;
import guide.me.server.model.Category;
import guide.me.server.model.Place;
import guide.me.server.model.User;
import guide.me.server.payload.ApiResponse;
import guide.me.server.payload.SignUpRequest;
import guide.me.server.payload.UserCategoryRequest;
import guide.me.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class GuideController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("users/{userId}/categories")
    public Set<Category> getUserCategories(@PathVariable(name = "userId") Long userId) {
        return userRepository.findById(userId)
                .map(User::getCategories)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
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
