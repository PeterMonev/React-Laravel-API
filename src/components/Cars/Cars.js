import "../Cars/Cars.css";
import { useAuth } from "../../hooks/authContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Cars = () => {
  // Get all cars
  const { user } = useAuth();
  const [cars, setCars] = useState([]);

  // Get all cars functionlity
  useEffect(() => {
    getAllCars();
  }, []);

  const getAllCars = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/getAllCars", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCars(data.data);
      } else {
        console.error("Failed to fetch cars.");
      }
    } catch (error) {
      console.error("An error occurred while fetching cars:", error);
    }
  };

  return (
    <>
      <h1 className="carsPage__h1">Cars Page</h1>
      <table className="car-table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
           
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, id) => (
            <tr key={id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
          
              <td>
                <Link to={`/cars/${car.id}`}  className="fa-solid fa-circle-info"></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {user && (
        <section className="addCar__form">
          <h2>Add a New Car</h2>
          <form>
            <div className="div__create__car">
              <input type="text" name="brand" placeholder="" />
              <label htmlFor="brand">
                <i className="fa-solid fa-car"></i>Brand:
              </label>
            </div>
            <div className="div__create__car">
              <input type="text" name="model" placeholder="" />
              <label htmlFor="model">
                <i className="fa-solid fa-car-side"></i>Model:
              </label>
            </div>
            <div className="div__create__car">
              <input type="text" name="year" placeholder="" />
              <label htmlFor="year">
                <i className="fa-solid fa-calendar-days"></i>Year:
              </label>
            </div>
            <button>Add Car</button>
          </form>
        </section>
      )}
    </>
  );
};
