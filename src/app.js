if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(registration => {
    console.log('SW Registered!');
    console.log(registration);
  }).catch(error => {
    console.log('SW Registration Failed');
    console.log(error);
  })
}

const form = document.getElementById('form')
const city = document.getElementById('input')

// the main weather
const today = document.getElementById('today')
const setCity = document.getElementById('set-city')
const setTemp = document.getElementById('set-temp')
const setImg = document.getElementById('set-img')
const setDesc = document.getElementById('set-desc')

// set the hourly time

const twoImg = document.getElementById('2-hr-img')
const fourImg = document.getElementById('4-hr-img')
const sixImg = document.getElementById('6-hr-img')

const twoTemp = document.getElementById('2hr-temp')
const fourTemp = document.getElementById('4hr-temp')
const sixTemp = document.getElementById('6hr-temp')

// getting the daily temp
const cards = document.querySelectorAll('.cards')

let cityName;



form.addEventListener('submit', (e) => {
  e.preventDefault()
  getData()
})

const key = "58e3fc7f12f1579ede5a37378fbc0e9e"


async function getData() {
  cityName = city.value;
  // set the innerhtml of the first city
  setCity.innerHTML = cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;

  try {
    const response = await fetch(url)
    const data = await response.json()
    const {
      coord
    } = await data
    console.log(data)
    // set the temp of the first city
    setTemp.innerHTML = `${data.main.temp}&deg;C`;
    //set image
    const weatherImg = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    setImg.src = weatherImg;
    //set the description
    setDesc.innerHTML = data.weather[0].description;
    // get the coordinates
    let longitude = coord.lon
    let latitude = coord.lat

    async function specifics() {
      const address = `https://api.openweathermap.org/data/2.5/onecall?lat=${longitude}&lon=${latitude}&exclude=minute&units=metric&appid=${key}`

      try {
        const specificsResponse = await fetch(address)
        const specificsData = await specificsResponse.json()
        console.log(specificsData)

        // setting the data of two plus hours
        const dataOne = specificsData.hourly[1].temp;
        const dataOneImg = specificsData.hourly[1].weather[0].icon;
        let d1 = `http://openweathermap.org/img/wn/${dataOneImg }@2x.png`;
        twoTemp.innerHTML = `${dataOne}&degC`;
        twoImg.src = d1;

        // setting the data of four plus hours
        const dataTwo = specificsData.hourly[3].temp;
        const dataTwoImg = specificsData.hourly[3].weather[0].icon;
        let d2 = `http://openweathermap.org/img/wn/${dataTwoImg }@2x.png`;
        fourTemp.innerHTML = `${dataTwo}&degC`;
        fourImg.src = d2;

        // setting the data of six plus hours
        const dataThree = specificsData.hourly[5].temp;
        const dataThreeImg = specificsData.hourly[5].weather[0].icon;
        let d3 = `http://openweathermap.org/img/wn/${dataThreeImg }@2x.png`;
        sixTemp.innerHTML = `${dataThree}&degC`;
        sixImg.src = d3;

        // get the daily data
        const weeklyData = specificsData.daily
        console.log(weeklyData);
      } catch (error) {
        console.log(error);
      }
    }
    specifics()
  } catch (error) {
    console.log(error);
  }

}


// getting and setting the date
const date = new Date().toDateString()
today.innerHTML = date