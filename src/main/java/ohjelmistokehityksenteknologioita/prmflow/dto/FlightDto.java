package ohjelmistokehityksenteknologioita.prmflow.dto;

public class FlightDto {
    private String flightNumber;
    private String scheduledTime;
    private String airport;
    private String airline;
    private String type;

    public FlightDto(String flightNumber, String scheduledTime, String airport, String airline, String type) {
        this.flightNumber = flightNumber;
        this.scheduledTime = scheduledTime;
        this.airport = airport;
        this.airline = airline;
        this.type = type;
    }

    public String getFlightNumber() { return flightNumber; }
    public String getScheduledTime() { return scheduledTime; }
    public String getAirport() { return airport; }
    public String getAirline() { return airline; }
    public String getType() { return type; }
}
