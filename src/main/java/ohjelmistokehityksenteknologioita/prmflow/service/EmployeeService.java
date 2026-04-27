package ohjelmistokehityksenteknologioita.prmflow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ohjelmistokehityksenteknologioita.prmflow.dto.Employee;

@Service
public class EmployeeService {
    
    public List<Employee> getOnDutyEmployees() {
        return List.of(
            new Employee("1", "Anna Avustaja", "PRM Assistant"),
            new Employee("2", "Gary Gatehelper", "PRM Assistant")
        );
    }
}

