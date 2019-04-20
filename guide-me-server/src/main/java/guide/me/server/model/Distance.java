package guide.me.server.model;

public class Distance {

    private String addressFrom;

    private Place placeTo;

    private Double distance;

    public Distance(String addressFrom, Place placeTo, Double distance) {
        this.addressFrom = addressFrom;
        this.placeTo = placeTo;
        this.distance = distance;
    }

    public String getAddressFrom() {
        return addressFrom;
    }

    public Place getPlaceTo() {
        return placeTo;
    }

    public Double getDistance() {
        return distance;
    }
}
