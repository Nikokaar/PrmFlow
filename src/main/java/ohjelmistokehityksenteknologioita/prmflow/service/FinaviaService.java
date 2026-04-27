package ohjelmistokehityksenteknologioita.prmflow.service;

import java.io.StringReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import ohjelmistokehityksenteknologioita.prmflow.dto.FlightDto;

@Service
public class FinaviaService {

    @Value("${finavia.api.key}")
    private String apiKey;

    private final HttpClient client = HttpClient.newHttpClient();

    // ---------------------------------------------------------
    // 1) Hakee XML:n sellaisenaan Finavian API:sta
    // ---------------------------------------------------------
    public String fetchFlights(String airport, String type) {

        String url = "https://apigw.finavia.fi/flights/public/v0/flights"
                + "?airport=" + airport
                + "&type=" + type;

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Accept", "application/xml")
                    .header("app_key", apiKey)
                    .GET()
                    .build();

            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            return response.body();

        } catch (Exception e) {
            throw new RuntimeException("Finavia API error: " + e.getMessage(), e);
        }
    }

    // ---------------------------------------------------------
    // 2) Parsii XML:n → DTO-listaksi → Spring muuntaa JSON:iksi
    // ---------------------------------------------------------
    public List<FlightDto> fetchFlightsAsDto(String airport, String type) {

        String xml = fetchFlights(airport, type);

        System.out.println("XML RESPONSE:");
        System.out.println(xml);

        List<FlightDto> flights = new ArrayList<>();

        try {
            Document doc = DocumentBuilderFactory.newInstance()
                    .newDocumentBuilder()
                    .parse(new InputSource(new StringReader(xml)));

            NodeList nodes = doc.getElementsByTagName("flight");

            for (int i = 0; i < nodes.getLength(); i++) {
                Element el = (Element) nodes.item(i);

                String flightNumber = getTagValue(el, "fltnr");
                String scheduledTime = getTagValue(el, "sdt");
                String airline = getTagValue(el, "callsign");

                // Destination code (fallback route_1 → route_2 → route_3 → route_4)
                String destination = firstNonEmpty(
                        getTagValue(el, "route_1"),
                        getTagValue(el, "route_2"),
                        getTagValue(el, "route_3"),
                        getTagValue(el, "route_4")
                );

                // Destination name (fallback route_n_1 → route_n_2 → route_n_3 → route_n_4)
                String destinationName = firstNonEmpty(
                        getTagValue(el, "route_n_1"),
                        getTagValue(el, "route_n_2"),
                        getTagValue(el, "route_n_3"),
                        getTagValue(el, "route_n_4")
                );

                String gate = getTagValue(el, "gate");
                flights.add(new FlightDto(
                        flightNumber,
                        scheduledTime,
                        destination,
                        destinationName,
                        airline,
                        type,
                        gate
                ));
            }

        } catch (Exception e) {
            throw new RuntimeException("XML parsing error: " + e.getMessage(), e);
        }

        return flights;
    }

    // ---------------------------------------------------------
    // Apumetodi XML-elementtien lukemiseen
    // ---------------------------------------------------------
    private String getTagValue(Element parent, String tagName) {
        NodeList list = parent.getElementsByTagName(tagName);
        if (list.getLength() == 0) return "";
        return list.item(0).getTextContent();
    }

    // ---------------------------------------------------------
    // Palauttaa ensimmäisen ei-tyhjän arvon
    // ---------------------------------------------------------
    private String firstNonEmpty(String... values) {
        for (String v : values) {
            if (v != null && !v.isBlank()) return v;
        }
        return "";
    }
}
