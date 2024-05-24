import React, { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";

const EditContactModal = ({
  setIsEditModalOpen,
  selectedContact,
  fetchContacts,
}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedContact) {
      setName(selectedContact.name);
      setSurname(selectedContact.surname);
      setPhone(selectedContact.phone);
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "surname") setSurname(value);
    else if (name === "phone") setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/contact/${selectedContact._id}`,
        {
          name,
          surname,
          phone,
        }
      );
      console.log("Contact updated successfully");
      fetchContacts();
      setIsEditModalOpen(false);
    } catch (error) {
      console.log(error);
      setError("Failed to update contact");
    }
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal__content">
        <div className="edit-modal__header">
          <h4 className="edit-modal__title">Edit contact</h4>
          <div
            className="edit-modal__close"
            onClick={() => setIsEditModalOpen(false)}
          >
            x
          </div>
        </div>
        <div className="edit-modal__body">
          <form onSubmit={handleSubmit} className="edit-modal__form">
            <input
              required
              placeholder="Name"
              name="name"
              type="text"
              className="edit-modal__name"
              value={name}
              onChange={handleChange}
            />
            <input
              required
              placeholder="Surname"
              name="surname"
              type="text"
              className="edit-modal__surname"
              value={surname}
              onChange={handleChange}
            />
            <input
              required
              placeholder="Phone"
              name="phone"
              type="phone"
              className="edit-modal__phone"
              value={phone}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-success edit-modal__button"
            >
              Submit
            </button>
          </form>
          {error && <p id="editErrorMessage">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;
