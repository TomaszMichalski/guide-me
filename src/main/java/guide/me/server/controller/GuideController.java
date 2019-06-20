package guide.me.server.controller;

import guide.me.server.exception.ResourceNotFoundException;
import guide.me.server.model.Category;
import guide.me.server.model.Place;
import guide.me.server.model.User;
import guide.me.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api")
public class GuideController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/{userId}/categories")
    public Set<Category> getUserCategories(@PathVariable(name = "userId") Long userId) {
        return userRepository.findById(userId)
                .map(User::getCategories)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }

    @RequestMapping("/{userId}/categories/{categoryId}/places")
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
}
