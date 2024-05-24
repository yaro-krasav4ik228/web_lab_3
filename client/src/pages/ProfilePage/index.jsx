import React from "react";

import "./style.css";

const ProfilePage = () => {
  return (
    <main className="page">
      <div className="page__profile profile">
        <div className="profile__container container">
          <div className="profile__alert alert alert-danger" role="alert">
            You need to sign in to get access to profile page!
          </div>
          <table className="profile__table table table-primary">
            <tbody>
              <tr>
                <th>First Name</th>
                <td>Unknown</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>Unknown</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>Unknown</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>Unknown</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>Unknown</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
