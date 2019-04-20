package guide.me.server.model;

public class Distance {

    private String addressFrom;

    private Place placeTo;

    private String distance;

    public Distance(String addressFrom, Place placeTo, String distance) {
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

    public String getDistance() {
        return distance;
    }
}
