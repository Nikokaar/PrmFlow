package ohjelmistokehityksenteknologioita.prmflow;


import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PrmFlowApplication implements CommandLineRunner {

    @Value("${finavia.api.key}")
    private String apiKey;

    public static void main(String[] args) {
        SpringApplication.run(PrmFlowApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Finavia API key: " + apiKey);

        HttpClient client = HttpClient.newHttpClient();

        String url = "https://apigw.finavia.fi/flights/public/v0/flights?airport=HEL&type=arrival";


        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Accept", "application/xml")
                .header("app_key", apiKey)
                .GET()
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("Status: " + response.statusCode());
        System.out.println("Body:");
        System.out.println(response.body());
    }
}
