import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Form from './components/Form';
import Update from './components/Update'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom : 10px;
`;

const TableRow = styled.tr`
border : 1px solid black;
  &:nth-child(even) {
    background-color: #f0f0f0;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border : 2px solid black;
`;

const TableCell = styled.td`
  padding: 10px;
  border : 2px solid black;
`;

const Button = styled.button`
  margin-left: 10px;
  background-color : blue;
  color : white;
  border : none;
  cursor : pointer;
  border-radius : 2px;
  font-size : 15px;
  padding : 5px;
`;

const App = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [updatePopup, setupdatePopup] = useState(false);
  const [currRow, setCurrRow] = useState({})

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios.get('http://localhost:5000/')
      .then((res) => { 
        setData(res.data);
        console.log(data)

      }).catch((err) => { console.log(err)})
  };

  const handleCheckboxChange = (event, row) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(selectedRows.filter((currRow) => currRow._id !== row._id));
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`); // Replace with your API endpoint
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRow = async (row) =>{
    setCurrRow(row)
    setupdatePopup(true)
  }

  const handleUpdateData =  async (formData) => {
    try {
      await axios.put(`http://localhost:5000/${currRow._id}`, formData);
      fetchData();
    } catch (error) {
      console.error(error);
    }
    // console.log(formData)
  };

  const handleCloseUpdate = ()=>{
    setupdatePopup(false)
  }


  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveData = async (formData) => {
    try {
      await axios.post(`http://localhost:5000/add`, formData);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const sendEmail = async () =>{
    console.log(selectedRows)
    try {
      await axios.post(`http://localhost:5000/send`, selectedRows);
    } catch (error) {
      console.error(error);
    }

    
  }


  return (
    <Container>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Select</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Hobby</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={(event) => handleCheckboxChange(event, row)}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.hobby}</TableCell>
              <TableCell style={{display : "flex", gap : "5px"}}>
                <Button onClick={() => handleDeleteRow(row._id)}>Delete</Button>
                <Button onClick={() => handleUpdateRow(row)}>Update</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleOpenPopup}>Add Row</Button>
      <Button onClick={sendEmail}>Send</Button>
      <Form isOpen={isPopupOpen} onClose={handleClosePopup} onSave={handleSaveData} />
      <Update isOpen={updatePopup} onClose={handleCloseUpdate} onSave={handleUpdateData} currRow = {currRow}/>
    </Container>
  );
};

export default App;
