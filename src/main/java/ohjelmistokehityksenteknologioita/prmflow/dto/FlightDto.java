package ohjelmistokehityksenteknologioita.prmflow.dto;

public class FlightDto {
    private String flightNumber;
    private String scheduledTime;
    private String destination;
    private String destinationName;
    private String airline;
    private String type;

    public FlightDto(
            String flightNumber,
            String scheduledTime,
            String destination,
            String destinationName,
            String airline,
            String type
    ) {
        this.flightNumber = flightNumber;
        this.scheduledTime = scheduledTime;
        this.destination = destination;
        this.destinationName = destinationName;
        this.airline = airline;
        this.type = type;
    }

    public String getFlightNumber() { return flightNumber; }
    public String getScheduledTime() { return scheduledTime; }
    public String getDestination() { return destination; }
    public String getDestinationName() { return destinationName; }
    public String getAirline() { return airline; }
    public String getType() { return type; }
}
