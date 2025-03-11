import axios from 'axios';
import '../WeatherApp/WeatherApp.css';
import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Apikey } from './Apikey';

function Weather() {
    const [data, setData] = useState(null); // Initialize as null
    const [error, setError] = useState(""); // Initialize as an empty string
    const [location, setLocation] = useState(""); // User input for location

    // Function to handle input change
    const handleChange = (e) => {
        setLocation(e.target.value);
    };

    // Function to fetch weather data
    const fetchData = async () => {
        if (!location.trim()) {
            setError("Please enter a location.");
            setData(null);
            return;
        }

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${Apikey}&units=metric`
            );
            setData(response.data);
            setError(""); // Clear any previous error
        } catch (err) {
            setError("Unable to fetch weather data. Please check the location and try again.");
            setData(null);
        }
    };

    // Function to handle search button click
    const handleClick = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
       <div className='Full'>
         <div className=" text-center" id="Background">
            <input type="text" onChange={handleChange} placeholder="Enter Location" value={location} className="weather-input"/>         
            <button style={{ marginLeft: "20px", width: "100px" }} onClick={handleClick} className="weather-button">Search</button>

            <Container className="text-center">
                {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
                {data && (
                    <Card className="mt-5" id="card">
                        <h2>{data.name}, {data.sys.country}</h2>
                        <h4>Temperature: {data.main.temp}°C</h4>
                        <p>Weather: {data.weather[0].description}</p>
                        <p>Pressure: {data.main.pressure}</p>
                        <p>Humidity: {data.main.humidity}%</p>
                        <p>Minimum-Tem: {data.main.temp_min}</p>
                        <p>Maximum-Tem: {data.main.temp_max}</p>
                        <p>Wind Speed: {data.wind.speed} m/s</p>
                        
                    </Card>
                )}
            </Container>
        </div>
       </div>
    );
}

export default Weather;




// import axios from 'axios'
// import '../WeatherApp/WeatherApp.css'
// import React, { useEffect, useState } from 'react'
// import { Card, Container } from 'react-bootstrap'
// import { Apikey } from './Apikey'

// function Weather() {

//     const[data,setData]=useState([]);
//     const [error, setError] = useState(null);
//     const [location,setLocation]=useState("")

//     if (!location){
//         setError('please enter a location')
//         return;
//     }

//     const handleChange=(e)=>{
//         e.preventDefault();
//         setLocation(e.target.value)
//     }
//     const handleClick=(e)=>{
//         e.preventDefault()
//         fetchData();
//         setLocation('')
//     }

//     const fetchData=async()=>{
//         try{
//             const responce = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${Apikey}`)
//             setData(responce.data)
//             console.log(responce.data)
//         }
//         catch(error){
//             setError(error)
//         }
//     }
//         useEffect(() => {
//             fetchData();
//         }, []);

//   return (
//     <div className='p-3 text-center' id='Background'>
//         <input type="text" onChange={handleChange} placeholder='Enter Location' value={location}/>
//         <button style={{marginLeft:"20px",width:"100px"}} onClick={handleClick}>Search</button>
//         <Container>
//        {data.name && (
//         <Card className="text-center m-3" id='card'>
//             <h2>{data.name}, {data.sys.country}</h2>
//             <h4>Temperature: {data.main.temp}</h4>
//             <p>Weather: {data.weather[0].description}</p>
//             <p>Humidity: {data.main.humidity}</p>
//             <p>Wind Speed: {data.wind.speed} m/s</p>
//         </Card>
//         )}
//         </Container>
      
//     </div>
//     )
// }

// export default Weather