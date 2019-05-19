package guide.me.server.controller;

import guide.me.server.exception.CategoryNotFoundException;
import guide.me.server.model.Category;
import guide.me.server.model.Place;
import guide.me.server.model.PlaceDto;
import guide.me.server.repository.CategoryRepository;
import guide.me.server.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
public class PlacesController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @PostMapping("/places")
    public ResponseEntity<Object> createPlace(@RequestBody PlaceDto placeDto) throws CategoryNotFoundException {
        Category category = categoryRepository.findById(placeDto.getCategoryId()).orElseThrow(CategoryNotFoundException::new);
        Place placeToSave = new Place(placeDto.getName(), placeDto.getAddress(),
                placeDto.getLatitude(), placeDto.getLongitude(), category);
        Place savedPlace = placeRepository.save(placeToSave);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/{id}")
                .buildAndExpand(savedPlace.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PostMapping("/categories")
    public ResponseEntity<Object> createCategory(@RequestBody Category category) {
        Category savedCategory = categoryRepository.save(category);

        URI location = ServletUriComponentsBuilder.fromCurrentServletMapping()
                .path("/api/{id}")
                .buildAndExpand(savedCategory.getId()).toUri();

        return ResponseEntity.created(location).build();
    }
}
