import './App.css'
import {useState, useEffect} from 'react'
import cloud from './assets/cloud.svg'
import rain from './assets/rain.svg'
import snow from './assets/snow.svg'
import sun from './assets/sun.svg'
import thunder from './assets/thunder.svg'
import fog from './assets/fog.svg'
import Cloud from './assets/bgCloud.jpg'
import Rain from './assets/bgRain.jpg'
import Snow from './assets/bgSnow.jpg'
import Sun from './assets/bgSun.jpg'
import Thunder from './assets/bgThunder.jpg'
import Fog from './assets/bgFog.jpg'
import toDay from './utils/toDay';
import toWeather from './utils/toWeather';



function App() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState([]);
  const icon = {"sun": sun, "cloud": cloud, "rain": rain, "fog": fog, "snow": snow, "thunder": thunder}
  const background = {"sun": Sun, "cloud": Cloud, "rain": Rain, "fog": Fog, "snow": Snow, "thunder": Thunder}

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max&timezone=auto`
        );
        const data = await response.json();
        const date = data.daily.time
        const weather = data.daily.weathercode
        const temp = data.daily.temperature_2m_max
        setData(data);
        setDate(toDay(date));
        setWeather(toWeather(weather));
        setTemp(temp);
      }
    )
  }, [])
  console.log(temp[0])
  return (
    <div className='background' style={{backgroundImage: `url(${background[weather[0]]})`}}>
      <div className='left'>
        <div className='text'>
          <div className='temp'>
            <h1 className='degree'>{Math.round(temp[0])}</h1>
            <p className='symbol'>°</p>
          </div>
        </div>
      </div>
      <div className='right'>
        <div className='container'>
          {date.map((s) => (
            <div className='card'>
              <p className='date'>{s}</p>
              <img src={icon[weather[date.indexOf(s)]]} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
