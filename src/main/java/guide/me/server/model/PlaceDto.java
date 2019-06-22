package guide.me.server.model;

public class PlaceDto {

    private Place place;

    private Category category;

    private Distance distance;

    public PlaceDto(Place place, Category category, Distance distance) {
        this.place = place;
        this.category = category;
        this.distance = distance;
    }

    public Place getPlace() {
        return place;
    }

    public Category getCategory() {
        return category;
    }

    public Distance getDistance() {
        return distance;
    }
}
