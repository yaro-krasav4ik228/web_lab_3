import React from "react";

import "./style.css";

const AboutPage = () => {
  return (
    <main className="page">
      <section className="page__about about">
        <div className="about__container container">
          <div className="about__text">
            <p>
              Welcome to nomer.OK, your go-to online phone book service for all
              your contact needs. At nomer.OK, we understand the importance of
              seamless communication, and we strive to simplify the way you
              connect with people.
            </p>
            <ul className="about__list">
              <li>
                View Contacts: The user can view all the contacts he has added
                to his contact book. Each contact will be displayed with a name
                and phone number
              </li>
              <li>
                Add new contact: The user can enter the name and phone number of
                the new contact in the corresponding fields and click the "Add"
                button. The contact will be saved in the contact book
              </li>
              <li>
                Delete Contact: User can delete any contact from their contact
                book. He can select the contact he wants to delete and confirm
                his intentions. The contact will be completely removed from the
                contact book
              </li>
              <li>
                Edit Contact: User can edit an existing contact. He can select
                the contact he wants to edit and make changes to the contact's
                name or phone number. After saving the changes, the contact will
                be updated in the contact book
              </li>
              <li>
                Sort contacts: User can sort contacts by name. Contacts will be
                displayed in alphabetical order
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
