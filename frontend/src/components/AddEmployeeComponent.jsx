import { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
const AddEmployeeComponent = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }
  function handleLastName(e) {
    setLastName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  const navigator = useNavigate();
  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email };
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log("Employee saved:", response.data);

            // Redirect to list  of  employees after submitting the new employee
            navigator("/employees");
          })
          .catch((error) => {
            console.error("There was an error saving the employee!", error);
          });
      }
    }
  }
  //function that checks the form data (validation)
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required!";
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is  required!";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is  required!";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }
  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      <h2 className="text-center">Add Employee</h2>;
    }
  }
  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);
  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group  mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter first  name..."
                  name="firstName"
                  value={firstName}
                  className={`form-control  ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={handleFirstName}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group  mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last  name..."
                  name="lastName"
                  value={lastName}
                  className={`form-control  ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={handleLastName}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group  mb-2">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  placeholder="Enter email..."
                  name="email"
                  value={email}
                  className={`form-control  ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  onChange={handleEmail}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;
