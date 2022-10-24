import React, { useEffect, useState } from 'react';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import './dashBoardForeCast.css';

function DashBoardForeCast() {
  const [dataWeather, setDataWeather] = useState([]);
  const [dataWeatherHour, setDataWeatherHour] = useState([]);
  const [iconWeather, setIconWeather] = useState(
    <i className='fas fa-cloud'></i>
  );
  const [imgUrl, setImgUrl] = useState(
    'https://wallpaperaccess.com/full/43868.jpg'
  );
  const [currentDate, setCurrentDate] = useState('');
  const [toggleSpiner, setToggleSpiner] = useState(false);

  const makeApiCall = async (event) => {
    if (event.keyCode === 13) {
      setToggleSpiner(true);
      const city = event.target.value;
      const api_data_week = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
      ).then((resp) => resp.json());

      const api_data_hour = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
      ).then((resp) => resp.json());

      if (api_data_week.cod === '200' || api_data_hour.cod === '200') {
        setToggleSpiner(false);
        setDataWeather(api_data_week);
        setDataWeatherHour(api_data_hour);
        return true;
      } else {
        return false;
      }
    }
  };

  const getDay = (date) => {
    const newDay = new Date(date).getDay();
    switch (newDay) {
      case 0:
        return 'MON';
      case 1:
        return 'TUE';
      case 2:
        return 'WED';
      case 3:
        return 'THU';
      case 4:
        return 'FRI';
      case 5:
        return 'SAT';
      case 6:
        return 'SUN';
      default:
        break;
    }
  };

  const getIconWeather = (weather) => {
    console.log(weather);
    if (dataWeather.list) {
      if (weather === 'Rain') {
        return <i className='far fa-cloud-rain'></i>;
      }
      if (weather === 'Clouds') {
        return <i className='far fa-cloud'></i>;
      }
      if (weather === 'Snow') {
        return <i className='far fa-snowflake'></i>;
      }
      if (weather === 'Clear') {
        return <i className='fas fa-sun'></i>;
      }
    }
  };

  useEffect(() => {
    if (dataWeatherHour.weather) {
      const mainWeather = dataWeatherHour.weather[0].main;
      // const mainWeather = 'Snow';
      if (mainWeather === 'Rain') {
        setImgUrl('https://wallpaperaccess.com/full/5811160.jpg');
        setIconWeather(<i className='far fa-cloud-rain'></i>);
      }
      if (mainWeather === 'Clouds') {
        setImgUrl('https://wallpaperaccess.com/full/43868.jpg');
        setIconWeather(<i className='far fa-cloud'></i>);
      }
      if (mainWeather === 'Snow') {
        setImgUrl('https://wallpaperaccess.com/full/343157.jpg');
        setIconWeather(<i className='far fa-snowflake'></i>);
      }
      if (mainWeather === 'Clear') {
        setImgUrl('https://4kwallpapers.com/images/walls/thumbs_3t/4044.jpg');
        setIconWeather(<i className='fas fa-sun'></i>);
      }
    }
  }, [dataWeather]);

  useEffect(() => {
    if (dataWeather.list) {
      setCurrentDate(new Date(dataWeather.list[0].dt_txt).toDateString());
    }
  }, [dataWeather]);

  console.log('check weather daily: ', dataWeather);
  console.log('check weather hour: ', dataWeatherHour);
  return (
    <>
      {dataWeather.cod === '200' ? (
        <></>
      ) : (
        <div className='weather-app weather-search-city'>
          <div className='bg-img bg-input-city'></div>
          <h1 className='search-city-title'>WEATHER FORECAST</h1>
          <input
            className='inp-city'
            type='text'
            placeholder='Enter your city'
            onKeyUp={(e) => makeApiCall(e)}
          />
          {toggleSpiner && (
            <div className='text-center loading-icon'>
              <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          )}
        </div>
      )}

      {dataWeather.cod === '200' ? (
        <div className='weather-app'>
          <div className='bg-img'>
            <img src='https://wallpaperaccess.com/full/17535.jpg' alt='' />
          </div>
          <div className='main-screen'>
            <div className='top-screen text-center'>
              <div className='bg-top-screen'>
                <img src={imgUrl} alt='main-bg' />
              </div>
              {toggleSpiner && (
                <div className='text-center loading-icon-main'>
                  <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                </div>
              )}
              <input
                className='inp-city'
                type='text'
                placeholder='Enter your city'
                onKeyUp={(e) => makeApiCall(e)}
              />
              <div className='temperature-weather'>
                <div className='temperature-container d-flex flex-column align-items-center'>
                  <h1 className='temperature'>
                    {(dataWeatherHour.main.temp - 273.15).toFixed(2) || ''}
                    °C
                  </h1>
                  <h5 className='date'>{currentDate}</h5>
                  <div className='wind d-flex align-items-center justify-content-center'>
                    <div>
                      <img src='images/wind.png' alt='' />
                    </div>
                    <h3>
                      {dataWeatherHour.wind.gust || '9'}
                      <small>.mph</small>
                    </h3>
                  </div>
                </div>
              </div>
              <div className='description-weather'>
                <div className='humidity weather-item mb-2 d-flex  '>
                  <div className='col-4 icon-humidity weather-icon'>
                    <i className='far fa-tint'></i>
                  </div>
                  <div>
                    <div className='title-humidity weather-title'>
                      <p className=' text-start'>Humidity</p>
                    </div>
                    <div className='index-humidity weather-index text-start'>
                      <h4>{dataWeatherHour.main.humidity || ''}%</h4>
                    </div>
                  </div>
                </div>
                <div className='humidity weather-item mb-2 d-flex  '>
                  <div className='col-4 icon-humidity weather-icon'>
                    <i className='fab fa-cloudversify'></i>
                  </div>
                  <div>
                    <div className='title-humidity weather-title'>
                      <p className=' text-start'>Air Pressure</p>
                    </div>
                    <div className='index-humidity weather-index text-start'>
                      <h4>{dataWeatherHour.main.pressure || ''} PS</h4>
                    </div>
                  </div>
                </div>
                <div className='humidity weather-item mb-2 d-flex  '>
                  <div className='col-4 icon-humidity weather-icon'>
                    <i className='far fa-cloud-rain'></i>
                  </div>
                  <div>
                    <div className='title-humidity weather-title'>
                      <p className=' text-start'>Chance of Rain</p>
                    </div>
                    <div className='index-humidity weather-index text-start'>
                      <h4>0%</h4>
                    </div>
                  </div>
                </div>
                <div className='humidity weather-item mb-2 d-flex  '>
                  <div className='col-4 icon-humidity weather-icon'>
                    <i className='far fa-wind'></i>
                  </div>
                  <div>
                    <div className='title-humidity weather-title'>
                      <p className=' text-start'>Wind Speed</p>
                    </div>
                    <div className='index-humidity weather-index text-start'>
                      <h4>{dataWeatherHour.wind.speed || ''}km/h</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bottom-screen'>
              <div className='bg-bottom-screen'></div>
              <div className='row bottom-screen-content'>
                <div className='col-sm-4 location d-flex align-items-center justify-content-center'>
                  <div className='location-weather-icon'>{iconWeather}</div>
                  <div className='location-weather-description'>
                    <div className='location-title'>
                      <h3>{dataWeather.city.name || ''}</h3>
                    </div>
                    <div className='location-weather'>
                      <div className='main-weather'>
                        <h5>{dataWeatherHour.weather[0].description || ''}</h5>
                      </div>
                      <div className='temp'>
                        <h5>
                          {(dataWeatherHour.main.temp_min - 273.15).toFixed(
                            2
                          ) || ''}
                          °C -
                          {(dataWeatherHour.main.temp_max - 273.15).toFixed(
                            2
                          ) || ''}
                          °C
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-sm-8 daily-forecast'>
                  <div className='row daily-forecast-item'>
                    <div className='daily-forecast-col col-3 d-flex flex-column justify-content-center align-items-center'>
                      <h4 className='day'>
                        {getDay(dataWeather.list[4].dt_txt)}
                      </h4>
                      {getIconWeather(dataWeather.list[4].weather[0].main)}
                      <h4 className='temp'>
                        {(dataWeather.list[4].main.temp - 273.15).toFixed(2) ||
                          ''}
                        °C
                      </h4>
                    </div>
                    <div className='daily-forecast-col col-3 d-flex flex-column justify-content-center align-items-center'>
                      <h4 className='day'>
                        {getDay(dataWeather.list[12].dt_txt)}
                      </h4>
                      {getIconWeather(dataWeather.list[12].weather[0].main)}
                      <h4 className='temp'>
                        {(dataWeather.list[12].main.temp - 273.15).toFixed(2) ||
                          ''}
                        °C
                      </h4>
                    </div>
                    <div className='daily-forecast-col col-3 d-flex flex-column justify-content-center align-items-center'>
                      <h4 className='day'>
                        {getDay(dataWeather.list[20].dt_txt)}
                      </h4>
                      {getIconWeather(dataWeather.list[20].weather[0].main)}
                      <h4 className='temp'>
                        {(dataWeather.list[20].main.temp - 273.15).toFixed(2) ||
                          ''}
                        °C
                      </h4>
                    </div>
                    <div className='daily-forecast-col col-3 d-flex flex-column justify-content-center align-items-center'>
                      <h4 className='day'>
                        {getDay(dataWeather.list[28].dt_txt)}
                      </h4>
                      {getIconWeather(dataWeather.list[28].weather[0].main)}
                      <h4 className='temp'>
                        {(dataWeather.list[28].main.temp - 273.15).toFixed(2) ||
                          ''}
                        °C
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default DashBoardForeCast;
