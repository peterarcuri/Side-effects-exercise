import { useState, useEffect } from 'react';
import Star from "./Star.jsx";
import styles from "./Space.module.css";

function Space() {

    const STAR_SIZE = 20;

    const [stars, setStars] = useState([]);

    const createRandomPosition = () => {
        
        const x = Math.random() * (window.innerWidth - STAR_SIZE); // avoid overflow
        const y = Math.random() * (window.innerHeight - STAR_SIZE);
        return { x, y };

    };

    const addStar = () => {

        setStars((prevStars) => [
            ...prevStars, 
            { id: Date.now(), position: createRandomPosition() },
        ]);
    };

    const destroyStar = (id) => {
        setStars((prevStars) => prevStars.filter((star) => star.id !== id));
    };

    useEffect(() => {

        const intervalId = setInterval(addStar, 2500);
        return () => clearInterval(intervalId); // Clear interval on component

    }, []);

    return (

        <div 
        
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                backgroundColor: "black",
                overflow: "hidden",
            }}
        > 
              {stars.map((star) => (
            <Star
                key={star.id}
                id={star.id}
                position={star.position}
                destroyStar={destroyStar}
            />     
          ))}       
        </div>      

    );
}


export default Space;