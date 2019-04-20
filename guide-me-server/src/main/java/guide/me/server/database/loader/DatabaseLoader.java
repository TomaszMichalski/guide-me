package guide.me.server.database.loader;

import guide.me.server.model.Category;
import guide.me.server.model.Place;
import guide.me.server.repository.CategoryRepository;
import guide.me.server.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public void run(String... args) throws Exception {
        Category universities = new Category("Uczelnie");
        Place agh = new Place("Akademia Górniczo-Hutnicza", "al. Mickiewicza 30, 30-059 Krakow, PL",
                50.052652, 19.987345, universities);
        Place uek = new Place("Uniwersytet Ekonomiczny", "Rakowicka 27, 31-510 Krakow, PL",
                50.068464, 19.953883, universities);
        Place pk = new Place("Politechnika Krakowska", "ul. Warszawska 24, 31-355 Krakow, PL",
                50.052652, 19.987345, universities);

        Category busStations = new Category("Dworce autobusowe");
        Place mainStation = new Place("Małopolski Dworzec Autobusowy", "ul. Bosacka 18, 31-505 Krakow, PL",
                50.052652, 19.987345, busStations);
        Place czyzynyStation = new Place("Dworzec Autobusowy Czyżyny", "Medweckiego 15, 31-863 Krakow, PL",
                50.052652, 19.987345, busStations);

        Category museums = new Category("Muzea");
        Place national = new Place("Muzeum Narodowe", "al. 3 Maja 1, 30-062 Krakow, PL",
                50.060431, 19.923620, museums);

        categoryRepository.save(universities);
        placeRepository.save(agh);
        placeRepository.save(uek);
        placeRepository.save(pk);

        categoryRepository.save(busStations);
        placeRepository.save(mainStation);
        placeRepository.save(czyzynyStation);

        categoryRepository.save(museums);
        placeRepository.save(national);
    }
}
