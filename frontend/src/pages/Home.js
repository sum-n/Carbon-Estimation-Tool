import React from 'react'
import './Home.css';
import { useNavigate } from "react-router-dom"
import Energy from './images/energy.png';
import Recycle from './images/recycle.png';
import Transport from './images/transport.png';

function Home() {

  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Opened');
    navigate('/Form');;
  }
  return (
    <div className='body'>
      <h1>Carbon Footprint Estimation Tool</h1>
      <h3 className='h3'><b>Simple guide to minimise carbon footprint</b></h3>
      <h3 className='h3'>1. Energy Footprint</h3>
      <img src={Energy} width="150" height="150"></img>
      <h3 className='h3'> &emsp; Turn off the lights, computers, laptops, monitors, etc.</h3>
      <br></br>
      <h3 className='h3'>2. Waste Footprint</h3>
      <img src={Recycle} width="150" height="140"></img>
      <h3 className='h3'> &emsp; Buy what you need</h3>
      <h3 className='h3'> &emsp; Recycle paper and cardboard</h3>
      <br></br>
      <h3 className='h3'>3. Transport Footprint</h3>
      <img src={Transport} width="150" height="150"></img>
      <h3 className='h3'> &emsp; Use public transport</h3>
      <h3 className='h3'> &emsp; Walk or cycle</h3>
      <br></br>
      <h3 className='h3'><b>Did you know?</b></h3>
      <h3 className='h3'>Over 30,500 tonnes of greenhouse gas is released every year according to Estates and Facilities of Trinity College Dublin.</h3>
      <a href='https://www.tcd.ie/estatesandfacilities/sustainability-and-green-campus/energy/' className='h3'>Learn more</a>
      <br></br>
      <p>Click on the button below to estimate the total amount of carbon emission released from your lecture weekly.</p>
      <button className='estimateButton' type='submit' onClick={handleSubmit}>Estimate</button>
    </div>
  )
}

export default Home;
