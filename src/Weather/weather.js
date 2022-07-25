import React, {useEffect, useState} from 'react'
import { WiHumidity, WiSunset , WiStrongWind, WiDayCloudyGusts,WiDayCloudy,WiDaySunny,WiDust} from "react-icons/wi";
import { FaSmog} from "react-icons/fa";
import { BiSearchAlt} from "react-icons/bi";
import { BsFillCloudRainHeavyFill,BsFillCloudHazeFill} from "react-icons/bs";
import { RiMistFill} from "react-icons/ri";
import { MdVisibility} from "react-icons/md";
import "./style.css"

export const Weather = () => {
 const [Search,setSearch]=useState("lahore");
  const[Weatherinformation,setWeatherinformation]=useState({});
  const[Weatherinfomood,setWeatherinfomood]=useState();
  


 const getWeatherinfo= async()=>{
try {
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${Search}&units=metric&appid=34f2c40835184657cb8fdc27d84b8a34`;
    
    let res=await fetch(url);
    let data=await res.json();
    const{temp,pressure,humidity} = data.main;
    const{main:weathermood}=data.weather[0];
    const{speed}=data.wind;
    const{sunset}=data.sys;
    const{visibility}=data;
    const{name:city}=data;

    const weatherinfo={
        temp,
        pressure,
        humidity,
        weathermood,
        speed,
        sunset,
        city,
        visibility,

    }
    let sec=sunset;
    let date=new Date(sec*1000);
    let timeStr=`${date.getHours()} : ${date.getMinutes()}`;
    weatherinfo.sunset=timeStr;
    let v=visibility;
    let w=v/1000;
    weatherinfo.visibility=w;
    setWeatherinformation(weatherinfo);
 
 
    let y=weathermood;
 let z;
 switch(y){
    case "Rain":
        z=<BsFillCloudRainHeavyFill  size="10rem"/>;
        break;
    case "Haze":
        z=<BsFillCloudHazeFill  size="10rem"/>;
        break;
    case "Mist":
        z=<RiMistFill  size="10rem"/>;
        break;
    case "Clouds":
        z=<WiDayCloudy  size="10rem"/>;
        break;
    case "Clear":
        z=<WiDaySunny  size="10rem"/>;
        break;
    case "Dust":
        z=<WiDust size="10rem"/>;
        break;
    case "Smoke":
        z=<FaSmog size="10rem"/>;
        break;
    default :
         z=<WiDaySunny size="10rem"/>;
            break;

  }

  setWeatherinfomood(z);


} catch (error) {
    console.log(error);
}
 }

 useEffect(()=>{
    getWeatherinfo();
 },[])
 
    return (

        <div className='maindiv'>
        <div className='search'>
        <input type="text"  className='searchbox' placeholder="OKARA" 
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
           

        />
        <BiSearchAlt className='search-icon' size="2rem"

                    onClick ={getWeatherinfo}
                    
        />
        </div>


        <div className='box'>
            <div className='box-img'>
       {/* < WiSunset  size="11rem"/> */}
       {Weatherinfomood}
        </div>  
       


        <div className='box-tame-date'>
            <div className='tamp'>
                <div className='tame'> {Weatherinformation.temp}&deg; </div>
                <div className='tame1'>
                    <div className='tame2'>{Weatherinformation.weathermood}</div>
                    <div className='tame3'>{Weatherinformation.city}</div>
                </div>
            </div>
            <div className='date'>
           <span>{new Date().toLocaleString()}
             </span> 
            </div>
        </div>

        <div className='footer'>
        <div className='footer-sub'> 
        <div className='icon'>
        <MdVisibility size="3rem" />
      
        </div>
        <div className='discription'>
        <span>
        {/* {Sunset} */}
            {Weatherinformation.visibility} KM
    
         <br />
         Visibility

        </span>
        </div>
        </div>


        <div className='footer-sub'> 
        <div className='icon'>
        <WiHumidity size="3rem" />
      
        </div>
        <div className='discription'>
        <span>
        {Weatherinformation.humidity} <br />
           Humidity

        </span>
        </div>
        </div>



        <div className='footer-sub'> 
        <div className='icon'>
       <WiDayCloudyGusts  size="3rem"/>
        </div>
        <div className='discription'>
        <span>
        {Weatherinformation.pressure} <br />
            Pressure

        </span>
        </div>
        </div>



        <div className='footer-sub'>  
        <div className='icon'>
        <WiStrongWind size="3rem"/>

        </div>
        <div className='discription'>
        <span>
        {Weatherinformation.speed} <br />
            Wind

        </span>
        </div>
        </div>




        </div>

        </div>
        </div>
        
        
    )
}
