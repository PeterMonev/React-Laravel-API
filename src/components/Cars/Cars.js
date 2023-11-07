import "../Cars/Cars.css";
import { useAuth } from "../../hooks/authContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Cars = () => {
  // Get all cars
  const { user } = useAuth();
  const [cars, setCars] = useState([]);

  // Create car
  const [createCar, setCreateCar] = useState({
    user_id: user ? user.id : null,
    brand: "",
    model: "",
    year: "",
  });

  // Create car validaton
  const [error, setError] = useState({ brand: "", model: "", year: "" });

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

  // Create car functionality
  const onSubmitCar = async (event) => {
    event.preventDefault();

    // Validation
    let currentError = {};

    if (createCar.brand.length < 3 || createCar.brand.length > 20) {
      currentError.brand = "Brand should be between 3 and 20 characters long.";
    }

    if (createCar.model.length < 3 || createCar.model.length > 20) {
      currentError.model = "Model should be between 3 and 20 characters long.";
    }

    const currentYear = new Date().getFullYear();
    if (createCar.year < 1901 || createCar.year > currentYear) {
      currentError.year = "Model should be between 3 and 20 characters long.";
    }
 
    if(Object.keys(currentError).length > 0){
      setError(currentError);
      return;
    }

    // Prepare data
    const data = {
      user_id: createCar.user_id,
      brand: createCar.brand,
      model: createCar.model,
      year: createCar.year,
    }


    try {
      const response = await fetch("http://127.0.0.1:8000/api/addCar", {
        method: "POST",
        headers: {
          "Content-Type": "applcation/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setError({ brand: "", model: "", year: "" })
        getAllCars();
        setCreateCar({
          user_id: user ? user.id : null,
          brand: "",
          model: "",
          year: "",
        })
      } else {
        console.error("Error can't create new car.");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <>
      <h1 className="carsPage__h1">Cars Page</h1>
      {cars.length === 0 ? (
        <p className="notFound">Not cars found.</p>
      ) : (
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
                  <Link to={`/cars/${car.id}`} className="fa-solid fa-circle-info"></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {user && (
        <section className="addCar__form">
          <h2>Add a New Car</h2>
          <form onSubmit={onSubmitCar}>
            <div className="div__create__car">
              <input
                type="text"
                name="brand"
                placeholder=""
                value={createCar.brand}
                onChange={(event) =>
                  setCreateCar({ ...createCar, brand: event.target.value })
                }
              />
              <label htmlFor="brand">
                <i className="fa-solid fa-car"></i>Brand:
              </label>
              {error.brand && <p className="createForm_p">{error.brand}</p>}
            </div>
            <div className="div__create__car">
              <input
                type="text"
                name="model"
                placeholder=""
                value={createCar.model}
                onChange={(event) =>
                  setCreateCar({ ...createCar, model: event.target.value })
                }
              />
              <label htmlFor="model">
                <i className="fa-solid fa-car-side"></i>Model:
              </label>
              {error.model && <p className="createForm_p">{error.model}</p>}
            </div>
            <div className="div__create__car">
              <input
                type="number"
                name="year"
                placeholder=""
                value={createCar.year}
                onChange={(event) =>
                  setCreateCar({ ...createCar, year: event.target.value })
                }
              />
              <label htmlFor="year">
                <i className="fa-solid fa-calendar-days"></i>Year:
              </label>
              {error.year && <p className="createForm_p">{error.year}</p>}
            </div>
            <button>Add Car</button>
          </form>
        </section>
      )}
    </>
  );
  
};
