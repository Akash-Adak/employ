import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const EmployeeList = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await EmployeeService.getEmployees();
                setEmployees(response.data);
            } catch (error) {
                setError(error);
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const deleteEmployee = (e, id) => {
        e.preventDefault();
        EmployeeService.deleteEmployeeById(id)
            .then(() => {
                setEmployees((prevElement) => {
                    return prevElement.filter((employee) => employee.id !== id);
                });
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    };

    const editEmployee = (e, id) => {
        e.preventDefault();
        navigate(`/editEmployee/${id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mx-auto my-8">
            <div>
                <button
                    onClick={() => navigate("/addEmployee")}
                    className="bg-slate-600 hover:bg-blue-700 my-12 font-semibold px-20 py-2 rounded"
                >
                    Add Employee
                </button>
            </div>
            <div>
                <table className="shadow">
                    <thead className="bg-slate-600">
                        <tr>
                            <th className="px-6 py-3 uppercase tracking-wide">Name</th>
                            <th className="px-6 py-3 uppercase tracking-wide">Phone</th>
                            <th className="px-6 py-3 uppercase tracking-wide">Email</th>
                            <th className="px-6 py-3 uppercase tracking-wide">DOB</th>
                            <th className="px-6 py-3 uppercase tracking-wide">Adhar No</th>
                            <th className="px-6 py-3 uppercase tracking-wide">Job Role</th>
                            <th className="px-6 py-3 uppercase tracking-wide">Address</th>
                            <th className="px-6 py-3 uppercase tracking-wide">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-white hover:text-black">
                                <td className="text-left px-6 py-4 whitespace-nowrap">{employee.name}</td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">{employee.phone}</td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">{employee.email}</td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">{employee.dob}</td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">{employee.adhar}</td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">{employee.role}</td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">{employee.addres}</td>
                       
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <a
                                        onClick={(e) => editEmployee(e, employee.id)}
                                        
                                         type="button" className="btn btn-primary"
                                    >
                                        Edit
                                    </a>
                                    <a
                                        onClick={(e) => deleteEmployee(e, employee.id)}
                                       type="button" className="btn btn-danger"
                                    >
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
