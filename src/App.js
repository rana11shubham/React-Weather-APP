import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
const [city,setCity]=useState("");
const [temperature,setTemperature]=useState(null);
const [humdity,setHumidity]=useState(null);
const [feelslike,setFeelslike]=useState(null);
const [precip,setPrecip]=useState(null);
const [error,setError]=useState(null);

const API_KEY=process.env.REACT_APP_API_KEY;
const API_ENDPOINT='http://api.weatherstack.com/current';

const getWeatherData=async()=>{
  try{

    const response=await fetch(`${API_ENDPOINT}?access_key=${API_KEY}&query=${city}&units=m`);
    const data=await response.json();
    console.log(data);
    if(response.ok){
      setTemperature(data.current.temperature);
      setHumidity(data.current.humidity);
      setFeelslike(data.current.feelslike);
      setPrecip(data.current.precip);
      setError(null);
    }
    else{
      setTemperature(null);
      setHumidity(null);
      setFeelslike(null);
      setPrecip(null);
      setError(data.error.info);
    }
  } catch(err){
    setTemperature(null);
    setHumidity(null);
    setFeelslike(null);
    setPrecip(null);
    setError('An error occurred while fetching data');
  }
};
const handleSubmit=(e)=>{
  e.preventDefault();
  getWeatherData();
}

const handleInputChange=(e)=>{
  setCity(e.target.value);
  setTemperature(null);
  setHumidity(null);
  setFeelslike(null);
  setPrecip(null);
  setError(null);
}


  return (
    <div className='container'>
      <h1 className='mt-5 mb-4'>Weather App</h1>
      <form onSubmit={handleSubmit} className='mb-4'>
        <div className='form-group'>
        <label>
          Enter City:
          </label>
          <input
            type="text"
            className='form-control'
            value={city}
            onChange={handleInputChange}
            />
        </div>
        <br></br>
        <button type="submit" className='btn btn-primary'>Get temperature</button>
        </form>
        <br></br>
      {temperature!==null && <p>Temperature:{temperature} Degree Celsius</p>}
      {feelslike!==null && <p>Feelslike:{feelslike} Degree Celsius</p>}
      {humdity!==null && <p>Humidity:{humdity} </p>}
      {precip!==null && <p>Precipitation:{precip} </p>}
      
      {error && <p className='text-danger'>Error:{error}</p>}
    </div>
  );
}

export default App;
