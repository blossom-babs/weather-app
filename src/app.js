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
const setNote = document.getElementById('hide')

// set the hourly time

const twoImg = document.getElementById('2-hr-img')
const fourImg = document.getElementById('4-hr-img')
const sixImg = document.getElementById('6-hr-img')

const twoTemp = document.getElementById('2hr-temp')
const fourTemp = document.getElementById('4hr-temp')
const sixTemp = document.getElementById('6hr-temp')

// getting the daily temp
const tempCards = document.querySelectorAll('.__card > .flex > .flex-1 > h1 > span')
const imgCards = document.querySelectorAll('.__card > .flex > .flex-2 > img')
const descCards = document.querySelectorAll('.__card > .main> h2')

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
    // if there is an error
    if (data.cod == '404') {
      city.value = 'CITY NOT FOUND.'
    }
    // set the temp of the first city
    setTemp.innerHTML = `${data.main.temp}&deg;C`;
    //set image
    const weatherImg = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    setImg.src = weatherImg;
    //set the description
    setDesc.innerHTML = data.weather[0].description;
    //set cute notes
    let theWeather = data.weather[0].description
    if (theWeather == 'broken clouds' || theWeather == 'few clouds' || theWeather == 'scattered clouds') {
      setNote.textContent = `Might rain. Don't forget your umbrella ☂`
      setNote.style.visibility = 'visible'
    } else if (theWeather == 'clear sky') {
      setNote.textContent = `Have the most beautiful day ❤`
      setNote.style.visibility = 'visible'
    } else if (theWeather == 'light rain' || theWeather == 'shower rain' || theWeather == 'rain') {
      setNote.textContent = `Hope you didn't forget your umbrella ☂`
      setNote.style.visibility = 'visible'
    } else if (theWeather == 'thunderstorm' || theWeather == 'mist') {
      setNote.textContent = `Hey. Hope you're in a safe place ❤`
      setNote.style.visibility = 'visible'
    } else if (theWeather == 'snow') {
      setNote.textContent = `Hey. Hope you're keeping warm ☕`
      setNote.style.visibility = 'visible'
    }
    // get the coordinates
    let longitude = coord.lon
    let latitude = coord.lat

    async function specifics() {
      const address = `https://api.openweathermap.org/data/2.5/onecall?lat=${longitude}&lon=${latitude}&exclude=minute&units=metric&appid=${key}`

      try {
        const specificsResponse = await fetch(address)
        const specificsData = await specificsResponse.json()


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
        // a function for the image
        function getImg(param) {
          return `http://openweathermap.org/img/wn/${param}@2x.png`;
        }
        //first date
        tempCards[0].innerHTML = weeklyData[0].temp.max
        let dayOneImg = getImg(weeklyData[0].weather[0].icon)
        imgCards[1].src = dayOneImg
        descCards[1].innerHTML = weeklyData[0].weather[0].description
        // second date
        tempCards[1].innerHTML = weeklyData[1].temp.max
        let dayTwoImg = getImg(weeklyData[1].weather[0].icon)
        imgCards[2].src = dayTwoImg
        descCards[2].innerHTML = weeklyData[1].weather[0].description
        // third day
        tempCards[2].innerHTML = weeklyData[2].temp.max
        let dayThreeImg = getImg(weeklyData[2].weather[0].icon)
        imgCards[3].src = dayThreeImg
        descCards[3].innerHTML = weeklyData[2].weather[0].description
        // fourth day
        tempCards[3].innerHTML = weeklyData[3].temp.max
        let dayFourImg = getImg(weeklyData[3].weather[0].icon)
        imgCards[4].src = dayFourImg
        descCards[4].innerHTML = weeklyData[3].weather[0].description
        // fifth day
        tempCards[4].innerHTML = weeklyData[4].temp.max
        let dayFiveImg = getImg(weeklyData[4].weather[0].icon)
        imgCards[5].src = dayFiveImg
        descCards[5].innerHTML = weeklyData[4].weather[0].description
        // sixth day
        tempCards[5].innerHTML = weeklyData[5].temp.max
        let daySixImg = getImg(weeklyData[5].weather[0].icon)
        imgCards[6].src = daySixImg
        descCards[6].innerHTML = weeklyData[5].weather[0].description
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

let newCard = document.querySelectorAll('.__card > .date > h2')

function incrementDay(param) {
  let nextDay = new Date(date)
  nextDay.setDate(nextDay.getDate() + param)
  return nextDay = nextDay.toDateString()
}

let firstDay = incrementDay(1)
newCard[1].innerHTML = firstDay;

let secondDay = incrementDay(2)
newCard[2].innerHTML = secondDay;

let thirdDay = incrementDay(3)
newCard[3].innerHTML = thirdDay;

let fourthDay = incrementDay(4)
newCard[4].innerHTML = fourthDay;

let fifthDay = incrementDay(5)
newCard[5].innerHTML = fifthDay;

let sixthDay = incrementDay(6)
newCard[6].innerHTML = sixthDay;