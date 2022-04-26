import React from 'react'
import { useLocation } from "react-router-dom";
import "./About.css";

function About() {
    return (
        <>
            <div className="about">
                <h1>About</h1>

                <h2 className='h2'>Most of the data need to do the estimation was taken from the following research papers and websites</h2>
                <h3 className='h3'><li><b>Science Direct: </b><a href='https://www-sciencedirect-com.elib.tcd.ie/science/article/pii/S0048969720374957'>
                    The carbon footprint of a UK University during the COVID-19 lockdown</a></li>
                </h3>
                <h3 className='h3'><li><b>Energuide: </b><a href='https://www.energuide.be/en/questions-answers/how-much-power-does-a-computer-use-and-how-much-co2-does-that-represent/54/#:~:text=A%20desktop%20uses%20an%20average,used%2C%20depending%20on%20the%20model'>
                    How much power does a computer use? And how much CO2 does that represent?</a></li>
                </h3>
                <h3 className='h3'><li><b>VANKYO: </b><a href='https://ivankyo.com/blogs/tech/how-much-power-does-a-projector-consume'>
                    How much power does a projector consume?</a></li>
                </h3>
                <h3 className='h3'><li><b>Compare The Market: </b><a href='https://www.comparethemarket.com.au/energy/guides/guide-to-technology-energy-consumption/#:~:text=An%20average%20tablet%20uses%200.015,plugged%20in%20for%20eight%20hours.=11g'>
                    Guide to technology energy usage</a></li>
                </h3>
                <h3 className='h3'><li><b>Regency Lighting: </b><a href='https://insights.regencylighting.com/kw-vs-kwh-how-much-energy-is-my-lighting-using'>
                    Lighting insights blog</a></li>
                </h3>
                <h3 className='h3'><li><b>Carbon Independent: </b><a href='https://www.carbonindependent.org/20.html?msclkid=946cb351a85711ecaf744959548f806e'>
                    Emissions from bus travel</a></li>
                </h3>
                <h3 className='h3'><li><b>ScienceDirect: </b><a href='https://www-sciencedirect-com.elib.tcd.ie/science/article/pii/S0959652611004409#:~:text=%E2%96%BA%20The%20carbon%20footprint%20of,4.74%20g%20CO2eq'>
                    Comparison of methodologies for estimating the carbon footprint - case study of office paper</a></li>
                </h3>
                <h3 className='h3'><li><b>ZDNet: </b><a href='https://www.zdnet.com/article/how-much-co2-are-your-zoom-meetings-generating/'>
                    How much CO2 are your Zoom meetings generating?</a></li>
                </h3>
                <br></br>
                <h2 className='h2'>Electricity usage to carbon footprint conversion</h2>
                <h3 className='h3'><li><b>United States Environmental Protection Agency: </b><a href='https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator?msclkid=43a4c246a84f11ec92470b99759050fe'>
                    Greenhouse Gas Equivalencies Calculator</a></li>
                </h3>
                <br></br>
                <h2 className='h2'>Images</h2>
                <h3 className='h3'><li><a href='https://www.pngkey.com/maxpic/u2t4y3o0t4o0i1q8/'>Light Buld Logo</a></li></h3>
                <h3 className='h3'><li><a href='https://clipartmag.com/recycle-logo-png'>Recycle Logo</a></li></h3>
                <h3 className='h3'><li><a href='https://icons-for-free.com/transportation+icon-1320085755614042295/'>Public Transport Logo</a></li></h3>
            </div>
        </>
    );
}

export default About;
