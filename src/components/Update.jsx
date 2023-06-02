import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width : 250px;
  padding : 50px;
  height : 400px;
`;

const FormTitle = styled.h2`
  margin-top: 0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
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

const Form = ({ isOpen, onClose, onSave, currRow }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hobby, setHobby] = useState('');
  // console.log(currRow);

  useEffect(()=>{
    setName(currRow.name)
    setPhone(currRow.phone)
    setEmail(currRow.email)
    setHobby(currRow.hobby)

  }, [currRow])
  const handleSave = () => {

    onSave({
      name : name,
      phone : phone,
      email : email,
      hobby : hobby
    });

    setName('');
    setPhone('');
    setEmail('');
    setHobby('');

    onClose();
  };

  return (
    <>
      {isOpen && (
        <FormContainer>
          <FormTitle>Update Row</FormTitle>
          <FormGroup>
            <Label>Name:</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone Number:</Label>
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Hobby:</Label>
            <Input
              type="text"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
            />
          </FormGroup>
          <ButtonContainer>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={onClose} style={{backgroundColor : "red"}}>Cancel</Button>
          </ButtonContainer>
        </FormContainer>
      )}
    </>
  );
};

export default Form;
