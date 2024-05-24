import React, { useState } from "react";
import axios from "axios";

import "./style.css";

const AddContactModal = ({
  setIsAddModalOpen,
  fetchContacts,
  contactsList,
}) => {
  const [data, setData] = useState({
    id: 0,
    name: "",
    surname: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
      id: contactsList.length + 1,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newContact = { id: contactsList.length + 1, ...data };
      const url = "http://localhost:8080/api/contact/create";
      await axios.post(url, newContact);
      fetchContacts();
      setIsAddModalOpen(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="add-modal">
      <div className="add-modal__content">
        <div className="add-modal__header">
          <h4 className="add-modal__title">Add contact</h4>
          <div
            className="add-modal__close"
            onClick={() => setIsAddModalOpen(false)}
          >
            x
          </div>
        </div>
        <div className="add-modal__body">
          <form action="#" className="add-modal__form" onSubmit={handleSubmit}>
            <input
              required
              placeholder="Name"
              name="name"
              type="text"
              className="add-modal__name"
              onChange={handleChange}
            />
            <input
              required
              placeholder="Surname"
              name="surname"
              type="text"
              className="add-modal__surname"
              onChange={handleChange}
            />
            <input
              required
              placeholder="Number"
              name="phone"
              type="phone"
              className="add-modal__phone"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-success add-modal__button">
              Submit
            </button>
          </form>
          <p id="addErrorMessage" />
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;
