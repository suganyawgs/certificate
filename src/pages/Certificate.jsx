
  import React, { useState, useEffect } from 'react';
  import Axios from 'axios';
  import { MdDelete } from 'react-icons/md';
  import Sidebar from '../components/Sidebar';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import DataTable from 'react-data-table-component';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import './certificate.css';
  
  const Certificates = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      fetchStudents();
    }, []);
  
    const fetchStudents = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/get');
        setStudents(response.data.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };
  
    useEffect(() => {
      // Filter students when search query changes
      const filteredData = students.filter(student =>
        student.studentName && student.studentName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filteredData);
    }, [searchQuery, students]);
  
    const handleDelete = (name) => {
      Axios.delete(`http://localhost:8000/${name}`)
        .then((response) => {
          console.log('Student deleted successfully');
          toast.success('Deleted successfully', {
            position: 'top-center',
            autoClose: 4000,
          });
          fetchStudents();
        })
        .catch((error) => {
          console.error('Failed to delete student:', error);
        });
    };
  
    const viewCertificate = (url) => {
      const fullURL = `http://localhost:8000/${url}`;
      window.open(fullURL, '_blank');
    };
  
  const columns = [
    {
       name: 'Serial No', 
       selector: (row, index) => index + 1,
       sortable: true 
    },
    {
       name: 'Student Name', 
       selector: (row) => row.studentName,
       sortable: true 
    },
    { 
      name: 'Date of Birth', 
      selector: (row) => row.dob,
      sortable: true 
    },
    { 
      name: 'Course Name', 
      selector: (row) => row.courseName,
      sortable: true 
    },
    { 
      name: 'Duration',
      selector: (row) => row.duration,
      sortable: true 
    },
    { 
      name: 'Mobile Number', 
      selector: (row) => row.mobileNumber,
      sortable: true 
    },
    { 
      name: 'Certificate Number', 
      selector: (row) => row.certificateNumber,
      sortable: true 
    },
    {
      name: 'Actions',
      cell: (row) => (
<div className="icon-container">
  <FaEye className="b1" onClick={() => viewCertificate(row.uploadCertificate)}/>
  <FaTrash className="b1" onClick={() => handleDelete(row.studentName)}/>
</div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const customStyles = {
    headRow: {
      style: {
        border: "none",
        outerWidth: "600px",

        // border: '1px solid #105d50',
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        paddingLeft: "15px", // override the cell padding for head cells
        paddingRight: "2px",
        backgroundColor: "#861b47",
        color: "#F9FAFB",
        fontWeight: "400",

        // border: '1px solid #105d50',
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "rgb(214, 214, 214)",
        borderBottomColor: "#FFFFFF",
        outline: "1px solid #FFFFFF",
        // border: '1px solid #105d50',
      },
    },

    pagination: {
      style: {
        border: "none",
      },
    },
    cells: {
      style: {
        // width: '200px',
        // paddingLeft: "15px",
        textAlign: "center", // Center-align text within cells
        fontWeight: "400",
        fontSize: "14px",
        color: "#364353",
        borderRight: "1px solid #ddd",

        // borderBottom: '1px solid #ddd',
      },
    },
  };
  return (
    <Sidebar>
      <div>
        <input
          type="text"
          placeholder="Search by student name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <DataTable
          title="Student Certificates"
          columns={columns}
          data={filteredStudents} // Use filteredStudents instead of students
          pagination
          customStyles={customStyles}
          highlightOnHover
          striped
        />
      </div>
      <ToastContainer className="toast-container" />
    </Sidebar>
  );
};

export default Certificates;
