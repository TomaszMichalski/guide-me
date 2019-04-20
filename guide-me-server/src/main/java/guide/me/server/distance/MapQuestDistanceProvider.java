package guide.me.server.distance;

import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Component
public class MapQuestDistanceProvider implements DistanceProvider {

    private static final String API_URL = "http://www.mapquestapi.com/directions/v2/route?key=";

    private static final String API_KEY = "NaXBQZhb0FMpnATguvAEaRhoAHtXkT1X";

    private static final String FROM = "&from=";

    private static final String TO = "&to=";

    @Override
    public Double getDistance(String addressFrom, String addressTo) {
        Double distance = null;

        try {
            URL requestUrl = new URL(buildRequestUrl(addressFrom, addressTo));
            HttpURLConnection connection = (HttpURLConnection) requestUrl.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder responseBuilder = new StringBuilder();
            String responseLine;
            while ((responseLine = br.readLine()) != null) {
                responseBuilder.append(responseLine);
            }

            JSONObject jsonResponse = new JSONObject(responseBuilder.toString());

            distance = jsonResponse.getJSONObject("route").getDouble("distance");

            connection.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return distance;
    }

    private String buildRequestUrl(String addressFrom, String addressTo) {
        StringBuilder sb = new StringBuilder();

        sb.append(API_URL);
        sb.append(API_KEY);
        sb.append(FROM);
        sb.append(addressFrom);
        sb.append(TO);
        sb.append(addressTo);

        return sb.toString().replaceAll("\\s", "%20");
    }
}
