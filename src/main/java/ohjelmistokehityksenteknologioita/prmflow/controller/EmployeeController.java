package ohjelmistokehityksenteknologioita.prmflow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ohjelmistokehityksenteknologioita.prmflow.dto.Employee;
import ohjelmistokehityksenteknologioita.prmflow.service.EmployeeService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping("/api/employees/on-duty")
    public List<Employee> getOnDutyEmployees() {
        return service.getOnDutyEmployees();
    }
}
