import React, { useState, useEffect } from 'react';

import './AddressBook.css';

const AddressBook = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: {
            name,
            mobile_number: contactNumber,
            address,
            gender,
            age,
          },
        }),
      });
      const data = await response.json();
      setContacts([...contacts, data]);
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await fetch(`api/contacts/${id}`, { method: 'DELETE' });
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const clearForm = () => {
    setName('');
    setContactNumber('');
    setAddress('');
    setGender('');
    setAge('');
  };

  const applyFilter = (contact) => {
    if (filterType === 'name') {
      return contact.name.toLowerCase().includes(filterValue.toLowerCase());
    }
    if (filterType === 'age') {
      return contact.age === parseInt(filterValue);
    }
    if (filterType === 'gender') {
      return contact.gender.toLowerCase() === filterValue.toLowerCase();
    }
    return false;
  };

  const filteredContacts = filterValue ? contacts.filter(applyFilter) : contacts;

  return (
    <div className="container">


      
      <h1>Address Book</h1>
     
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleAddContact}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="tel"
                id="contactNumber"
                className="form-control"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <input
                type="text"
                id="gender"
                className="form-control"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                className="form-control"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Person Details
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <select
            className="form-control"
            value={filterType}
            onChange={handleFilterTypeChange}
          >
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="gender">Gender</option>
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder={`Filter by ${filterType}`}
            value={filterValue}
            onChange={handleFilterValueChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr key={contact.id}>
                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.mobile_number}</td>
                  <td>{contact.address}</td>
                  <td>{contact.gender}</td>
                  <td>{contact.age}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddressBook;
