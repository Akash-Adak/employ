package org.codingwallah.emproject.services;

import java.util.ArrayList;
import java.util.List;

import org.codingwallah.emproject.entity.EmployeeEntity;
import org.codingwallah.emproject.model.Employee;
import org.codingwallah.emproject.repository.EmployeeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeSerivceImpl implements EmployeeSerivce{

    @Autowired
    private EmployeeRepository employeeRepository;

    //List<Employee> employees= new ArrayList<>();

    @Override
    public String createEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);

        employeeRepository.save(employeeEntity);
       // employees.add(employee);
        return "Saved Successfully";
    }

    @Override
    public Employee readEmployee(Long id) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
     
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeEntity,employee);

        return employee;
    }

    @Override
    public List<Employee> readEmployees() {
        List<EmployeeEntity> employeesList = employeeRepository.findAll();
        List<Employee> employees= new ArrayList<>();
   //    for(int i=0;i<employeesList.size();i++){
        for (EmployeeEntity employeeEntity : employeesList) {
            
            Employee emp = new Employee();
            emp.setId(employeeEntity.getId());
            emp.setName(employeeEntity.getName());
            emp.setEmail(employeeEntity.getEmail());
            emp.setPhone(employeeEntity.getPhone());
            emp.setAddres(employeeEntity.getAddres());
            emp.setDob(employeeEntity.getDob());
            emp.setAdhar(employeeEntity.getAdhar());
            emp.setRole(employeeEntity.getRole());
            
          
            employees.add(emp);
        }
        return employees;     
    }

    @Override
    public boolean deleteEmployee(Long id) {
        EmployeeEntity emp = employeeRepository.findById(id).get();
        employeeRepository.delete(emp);
        return true;
    }

    @Override
    public String updateEmployee(Long id, Employee employee) {
        EmployeeEntity exestingEmployee = employeeRepository.findById(id).get();
        
        exestingEmployee.setEmail(employee.getEmail());
        exestingEmployee.setName(employee.getName());
        exestingEmployee.setPhone(employee.getPhone());
        exestingEmployee.setAddres(employee.getAddres());
        exestingEmployee.setRole(employee.getRole());
        exestingEmployee.setAdhar(employee.getAdhar());
        exestingEmployee.setDob(employee.getDob());

        employeeRepository.save(exestingEmployee);
        
       return "Update Succesfully";
    }

    

   
}
