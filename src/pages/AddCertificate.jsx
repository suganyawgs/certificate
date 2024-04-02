import React, { useState } from "react";
import "./addCertificate.css";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


//const apiUrl = process.env.REACT_APP_API_URL;
const AddCertificates = () => {

  const history = useNavigate();
  const courseOptions = [
    "PG in Full Stack Development",
    "PG in Digital Marketing",
  ];
  const durationOptions = ["2 Months", "3 Months", "6 Months"];

  const initialData={
    studentName:"",
    dob:"",
    courseName:"",
    duration:"",
    mobileNumber:"",
    certificateNumber:"",
    uploadCertificate:null
  }

  const[formData,setFormData]=useState(initialData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      uploadCertificate: file
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formSendData = new FormData();
    formSendData.append("studentName", formData.studentName);
    formSendData.append("dob", formData.dob);
    formSendData.append("courseName", formData.courseName);
    formSendData.append("duration", formData.duration);
    formSendData.append("mobileNumber", formData.mobileNumber);
    formSendData.append("certificateNumber", formData.certificateNumber);
    formSendData.append("uploadCertificate", formData.uploadCertificate);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios.post(`http://localhost:8000/addcertificate`,formSendData,config)
    .then(res => console.log(res.data.data))
    .catch(err => console.log(err));
    history('/certificates')
  };

  return (
    <Sidebar>
        <form onSubmit={handleSubmit} className="student-form">
          <label>
            Student Name:
            <input
              type="text"
              value={formData.studentName}
              name="studentName"
              onChange={handleOnChange}
              pattern="^[A-Za-z\s]+$" // Regular expression to allow only letters and spaces
              required
              title="Please enter a valid name"
            />
          </label>

          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleOnChange}
              required
            />
          </label>

          <label>
            Course Name:
            <select
              value={formData.courseName}
              name="courseName"
              onChange={handleOnChange}
              required
            >
              <option value="" disabled>
                Select Course
              </option>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </label>

          <label>
            Duration:
            <select
              value={formData.duration}
              onChange={handleOnChange}
              name="duration"
              required
            >
              <option value="" disabled>
                Select{" "}
              </option>
              {durationOptions.map((duration, index) => (
                <option key={index} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </label>

          <label>
            Mobile Number:
            <input
              type="text"
              value={formData.mobileNumber}
              name="mobileNumber"
              onChange={handleOnChange}
              pattern="[0-9]*" // Regular expression to allow only numbers
              required
              title="Please enter numbers only"
            />
          </label>

          <label>
            Certificate Number:
            <input
              type="text"
              name="certificateNumber"
              value={formData.certificateNumber}
              onChange={handleOnChange}
              required
            />
          </label>

          <label>
            Upload Certificate:
            <input
              type="file"
              //value={formData.uploadCertificate}
              name="uploadCertificate"
              onChange={handleFileChange}
              required
            />
          </label>

          <button type="submit">Submit</button> 
        </form>
 
    </Sidebar>
  );
};

export default AddCertificates;
