import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // ⚠️ IMPORTANT: Change the port (7098) if your Swagger URL is different!
  const API_URL = "https://localhost:7098/api/Employees";

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ id: 0, name: '', dateOfBirth: '', dateOfJoining: '', department: '', salary: 0 });
  const [isEditing, setIsEditing] = useState(false);

  // 1. Fetch data from C# when the page loads
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setEmployees(data);
  };

  // 2. Handle typing in the textboxes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Save button clicked (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh
    
    if (isEditing) {
      await fetch(`${API_URL}/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setIsEditing(false);
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: 0 }) 
      });
    }

    setFormData({ id: 0, name: '', dateOfBirth: '', dateOfJoining: '', department: '', salary: 0 });
    fetchEmployees();
  };

  // 4. Edit button clicked
  const handleEdit = (emp) => {
    const dob = emp.dateOfBirth.split('T')[0];
    const doj = emp.dateOfJoining.split('T')[0];
    setFormData({ ...emp, dateOfBirth: dob, dateOfJoining: doj });
    setIsEditing(true);
  };

  // 5. Delete button clicked
  const handleDelete = async (id) => {
    if(window.confirm("Delete this employee?")) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchEmployees();
    }
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      {/* --- INPUT FORM --- */}
      <div className="form-card">
        <h2>{isEditing ? "Edit Employee" : "Add New Employee"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required title="Date of Birth"/>
          <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleInputChange} required title="Date of Joining"/>
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleInputChange} required />
          <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleInputChange} required />
          
          <button type="submit" className={isEditing ? "btn-update" : "btn-add"}>
            {isEditing ? "Update" : "Save"}
          </button>
          
          {isEditing && (
            <button type="button" className="btn-cancel" onClick={() => {
              setIsEditing(false);
              setFormData({ id: 0, name: '', dateOfBirth: '', dateOfJoining: '', department: '', salary: 0 });
            }}>Cancel</button>
          )}
        </form>
      </div>

      {/* --- DISPLAY TABLE --- */}
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Joining Date</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{new Date(emp.dateOfBirth).toLocaleDateString()}</td>
              <td>{new Date(emp.dateOfJoining).toLocaleDateString()}</td>
              <td>{emp.department}</td>
              <td>Rs{emp.salary}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(emp)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;