import React, { useState } from 'react'
import axios from 'axios';
import './WeatherApp.css'



function WeatherApp() {

    const [zip, setZip] = useState("")
    const [weather, setWeather] = useState(null)
    const [tempView, setTempView] = useState(1)
    const [error, setError] = useState(null)


    console.log(weather)
    async function getWeather(e) {
        e.preventDefault()
        await axios.get("https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",&appid=be1fc406944f287cb38a91655d63aa8d")
            .then(function (response) {
                // handle success

                setWeather(response.data);
                setError(null)
            })
            .catch(function (error) {
                // handle error
                setError(error.response.data.message)
            })

    }


    let kel = weather ? Math.floor(weather.main.temp) : null
    let far = Math.floor((kel - 273.15) * (9 / 5) + 32);
    let cel = Math.floor((far - 32) * (5 / 9));
    let feels = weather ? Math.floor((weather.main.feels_like - 273.15) * (9 / 5) + 32) : null
    let lo = weather ? Math.floor((weather.main.temp_min - 273.15) * (9 / 5) + 32) : null
    let hi = weather ? Math.floor((weather.main.temp_max - 273.15) * (9 / 5) + 32) : null

    let temp = tempView === 1 ? far : tempView === 2 ? cel : tempView === 3 ? kel : null



    return (
        <div id="weather" className="container">
            <div className="container mt-4 text-white">
                <div className="row">
                    <div className="col-md-4 offset-4 mt-5 align-center">
                        <form onSubmit={getWeather} className="form-inline my-2 my-lg-0">
                            <input onChange={(e) => setZip(e.target.value)} value={zip} className="form-control mr-sm-2" type="zip" placeholder="Enter zip" aria-label="zip" />
                            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Get weather</button>
                        </form>
                        {error ?
                            <div className="mt-5">
                                <h5 className="text-secondary text-center mt-5"> Uh oh, {error}!</h5>
                            </div>
                            :
                            weather !== null ?
                                <div className="mt-3" style={{ width: "18rem;" }}>
                                    <p className="card-title text-center text-white pt-3"><b>{weather.name}</b></p>
                                    <div id="card" className="card px-4 py-2" style={{ width: "18rem;" }}>
                                        <div className="row">
                                            <div className="col-8">
                                                <h1 className="display-3">{temp}&deg;</h1>
                                                <div className="form-check form-check-inline float-left">
                                                    <input onChange={() => setTempView(1)} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                    <small className="form-check-label" for="inlineRadio1">&deg;F</small>
                                                </div>
                                                <div className="form-check form-check-inline float-left">
                                                    <input onChange={() => setTempView(2)} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                    <small className="form-check-label" for="inlineRadio2">&deg;C</small>
                                                </div>
                                                <div className="form-check form-check-inline float-left">
                                                    <input onChange={() => setTempView(3)} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                                    <small className="form-check-label" for="inlineRadio3">&deg;K</small>
                                                </div>
                                            </div>
                                            <div className="col-4 mt-3">
                                                <img id="img" className="pr-4" src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt="Card image cap" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-7">
                                                <small><b>{weather.weather[0].description}</b></small>
                                            </div>
                                            <div className="col-5 text-right">
                                                <small><b>Feels like {feels}&deg;</b></small> <br />
                                                <small><b>{hi}&deg;/{lo}&deg;</b></small>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                :
                                null}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default WeatherApp