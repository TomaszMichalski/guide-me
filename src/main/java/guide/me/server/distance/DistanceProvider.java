package guide.me.server.distance;

public interface DistanceProvider {

    Double getDistance(String addressFrom, String addressTo);
}
