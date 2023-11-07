import { useEffect, useState } from "react";

import "../Dashboard/Dashboard.css";
import { useAuth } from "../../hooks/authContext";

export const Dashboard = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
 console.log(user);

  useEffect(() => {
    getUserInfo(user.token, user.id);
  }, [user]);

  const getUserInfo = async (token, userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/getUserInfo/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);

      } else {
        console.error("Failed to fetch user information");
      }
    } catch (error) {
      console.error("An error occurred while fetching user information:", error);
    }
  };

  return (
    <>
   { userInfo &&
    <section className="dashboard__container">
      <h2 className="dashboard__title">User Information</h2>
      <div className="dashboard__info">
      <p className="dasboard__item">Name: <span>{userInfo.data.name}</span></p>
      <p className="dasboard__item">Email: <span>{userInfo.data.email}</span></p>
      </div>
    </section>
    }
    </>
  );
};
