import { useEffect, useState } from "react";

import "../Dashboard/Dashboard.css";
import { useAuth } from "../../hooks/authContext";

export const Dashboard = () => {
  // GET user info
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
 
  // Edit user info
  const [isEdit, setEdit] = useState(false);
  const [updateUser, setUpdateUser] = useState({ name: "", email: "" });
  const [isEditFetch, setEditFetch] = useState(false);

  // GET user info functionlity
  useEffect(() => {
    getUserInfo(user.token, user.id);
    console.log('yes');
  }, [user, isEditFetch]);

  const getUserInfo = async (token, userId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/getUserInfo/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        console.error("Failed to fetch user information");
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching user information:",
        error
      );
    }
  };

  // Edit user functionality
  const handleEdit = () => {
    setEdit(true);
    setUpdateUser({
      name: userInfo.data.name,
      email: userInfo.data.email,
    });
  };

  const onSubmitEdit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/updateUserInfo/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(updateUser),
        }
      );

      if (response.ok) {
        // const result = await response.json();
        
         isEditFetch ? setEditFetch(false) : setEditFetch(true);
         setEdit(false);
      } else {
      }
    } catch (error) {
      console.error("Failed o save user information");
    }
  };

  return (
    <>
      {userInfo && (
        <section className="dashboard__container">
          <h2 className="dashboard__title">User Information</h2>
          {isEdit ? (
            <div className="dashboard__info">
              <form onSubmit={onSubmitEdit} >
              <div>
                <label className="edit__label">Name:</label>
                <input
                  className="edit__input"
                  type="text"
                  value={updateUser.name}
                  onChange={(event) =>
                    setUpdateUser({ ...updateUser, name: event.target.value })
                  }
                />
              </div>
              <div>
                <label className="edit__label">Email:</label>
                <input
                  className="edit__input"
                  type="email"
                  value={updateUser.email}
                  onChange={(event) =>
                    setUpdateUser({ ...updateUser, email: event.target.value })
                  }
                />
              </div>
              <button className="btn__handleEdit" >
                Save
              </button>
              </form>
            </div>
          ) : (
            <div className="dashboard__info">
              <p className="dasboard__item">
                Name: <span>{userInfo.data.name}</span>
              </p>
              <p className="dasboard__item">
                Email: <span>{userInfo.data.email}</span>
              </p>
              <button className="btn__handleEdit" onClick={handleEdit}>
                Edit
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};
