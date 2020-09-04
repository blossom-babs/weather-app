const form = document.getElementById('form')
const dateHolder = document.getElementById('date-holder')
const locationHolder = document.getElementById('location')
const city = document.getElementById('input')
const weatherDesc = document.getElementById('weather-desc')
const weatherMain = document.getElementById('weather-main')
const weatherImg = document.getElementById('weather-img')


let cityName;

form.addEventListener('submit', (e) => {
  e.preventDefault()
  cityName = city.value;
  console.log(cityName)

  // get weather
  const key = "58e3fc7f12f1579ede5a37378fbc0e9e"
  //const url = `//api.openweathermap.org/data/2.5/onecall?q=${cityName}&appid=${key}&units=metric`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;

  fetch(url).then(resp => resp.json()).then(data => {
    const {
      weather
    } = data

    const desc = weather[0].description
    const main = weather[0].main
    console.log(weather[0].id)
    let img = weather[0].icon
    const weatherImg = `http://openweathermap.org/img/wn/${img}@2x.png`
    console.log(weatherImg)

    //setting the values
    weatherImg.src = weatherImg;
    console.log(weatherImg)
    weatherMain.innerHTML = main;
    weatherDesc.innerHTML = desc;
  })

  // setting the city location
  locationHolder.innerHTML = cityName;
})


// getting the date
const date = new Date().toDateString()

// setting the values to the htmls
dateHolder.innerHTML = date;