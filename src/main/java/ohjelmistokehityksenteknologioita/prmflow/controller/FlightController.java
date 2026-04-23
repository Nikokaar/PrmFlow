package ohjelmistokehityksenteknologioita.prmflow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ohjelmistokehityksenteknologioita.prmflow.dto.FlightDto;
import ohjelmistokehityksenteknologioita.prmflow.service.FinaviaService;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    private final FinaviaService finaviaService;

    public FlightController(FinaviaService finaviaService) {
        this.finaviaService = finaviaService;
    }

@GetMapping
public List<FlightDto> getFlights(
        @RequestParam String airport,
        @RequestParam String type) {

    return finaviaService.fetchFlightsAsDto(airport, type);
}
}
