package guide.me.server.distance;

import org.springframework.stereotype.Component;

@Component
public class DistanceProviderImpl implements DistanceProvider {

    @Override
    public String getDistance(String addressFrom, String addressTo) {
        return "mock-distance";
    }
}
