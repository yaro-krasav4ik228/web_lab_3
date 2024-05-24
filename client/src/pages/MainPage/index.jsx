import React, { useState, useEffect } from "react";
import axios from "axios";

import AddContactModal from "../../components/AddContactModal";
import EditContactModal from "../../components/EdiContactModal";

const MainPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contactsList, setContactsList] = useState([]);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [highlightedClass, setHighlightedClass] = useState("");

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/contact/all");
      setContactsList(response.data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:8080/api/contact/", {
        data: { name: selectedContact.name },
      });
      console.log("Contact deleted successfully");
      fetchContacts();
      setSelectedContact(null);
    } catch (error) {
      console.log(error);
    }
  };

  const sortContactsByName = () => {
    const sortedContacts = [...contactsList].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });
    setContactsList(sortedContacts);
  };

  return (
    <main className="page">
      {isAddModalOpen && (
        <AddContactModal
          setIsAddModalOpen={setIsAddModalOpen}
          fetchContacts={fetchContacts}
          contactsList={contactsList}
        />
      )}
      {isEditModalOpen && (
        <EditContactModal
          setIsEditModalOpen={setIsEditModalOpen}
          selectedContact={selectedContact}
          fetchContacts={fetchContacts}
        />
      )}
      <section className="page__main main">
        <div className="main__container container">
          <div className="main__body">
            <div className="main__table table-main">
              <div className="table-main__row">
                <div className="table-main__head table-main__head_1">№</div>
                <div className="table-main__head table-main__head_2">
                  First Name
                </div>
                <div className="table-main__head table-main__head_3">
                  Last Name
                </div>
                <div className="table-main__head table-main__head_4">
                  Phone number
                </div>
              </div>
              {contactsList.map((contact) => (
                <div
                  className={`table-main__row ${
                    selectedContact === contact ? highlightedClass : ""
                  }`}
                  onClick={() => {
                    setSelectedContact(contact);
                    setHighlightedClass("table-main__row_selected");
                  }}
                >
                  <div className="table-main__data table-main__data_1">
                    {contact.id}
                  </div>
                  <div className="table-main__data table-main__data_2">
                    {contact.name}
                  </div>
                  <div className="table-main__data table-main__data_3">
                    {contact.surname}
                  </div>
                  <div className="table-main__data table-main__data_4">
                    {contact.phone}
                  </div>
                </div>
              ))}
            </div>
            <div className="main__manage manage-main">
              <div
                className="manage-main__buttons"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  type="button"
                  className="manage-main__button button-add btn btn-outline-secondary"
                  style={{ marginRight: "25px" }}
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Add contact
                </button>
                <button
                  type="button"
                  className="manage-main__button button-delete btn btn-outline-secondary"
                  style={{ marginRight: "25px" }}
                  onClick={() => handleDelete()}
                  disabled={!selectedContact}
                >
                  Delete contact
                </button>
                <button
                  type="button"
                  className="manage-main__button button-edit btn btn-outline-secondary"
                  style={{ marginRight: "25px" }}
                  onClick={() => setIsEditModalOpen(true)}
                  disabled={!selectedContact}
                >
                  Edit contact
                </button>
                <button
                  type="button"
                  className="manage-main__button button-sort btn btn-outline-secondary"
                  style={{ marginRight: "25px" }}
                  onClick={sortContactsByName}
                >
                  Sort by name
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
