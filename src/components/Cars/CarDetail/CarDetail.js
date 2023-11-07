import { useParams } from "react-router-dom";
import "../CarDetail/CarDetail.css";
import { useEffect, useState } from "react";

export const CarDetail = () => {
    const { carId } = useParams();
    const numId = Number(carId);
    const [carDetail, setCarDetail] = useState(null);

    useEffect(()=> {
        getCarDetail(numId);
    }, [numId]);

    const getCarDetail = async(id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/getCarById/${id}`,{
               method: "GET",
               headers: {
                'Content-Type': 'application/json',
               }
            });

            const result = await response.json();
            setCarDetail(result.data);
            
        } catch (error) {
            
        }
    }

  return (
    <section className="section__carDetail">
 
        <h2>Car Details</h2>

        {carDetail &&  <div className="div__carDetailInfo">
        <p>Brand: <span>{carDetail[0].brand}</span></p>
        <p>Model: <span>{carDetail[0].model}</span></p>
        <p>Year: <span>{carDetail[0].year}</span></p> 
        </div> }
       

    </section>
  );
};
