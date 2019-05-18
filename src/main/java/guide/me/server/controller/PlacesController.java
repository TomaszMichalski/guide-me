package guide.me.server.controller;

import guide.me.server.model.Category;
import guide.me.server.model.Place;
import guide.me.server.repository.CategoryRepository;
import guide.me.server.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlacesController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @PostMapping("/places")
    public Place createPlace(@RequestBody Place place) {
        return placeRepository.save(place);
    }

    @PostMapping("/categories")
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }
}
