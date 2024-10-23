async function getWeatherAPI() {
    
  try {
    const weather = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${choseLocation.value}/?key=J6475C9TAP3X5MZ4BQ36BGW66`,
    );
    const weatherData = await weather.json();

    return weatherData;
  } catch (error) {
    console.log(error);
  }
}

class DisplayData {
  constructor(date, hour, temp, condition) {
    this.date = date;
    this.hour = hour;
    this.temp = temp;
    this.condition = condition;
  }
}

async function loadData() {
  const weatherData = await getWeatherAPI();
  const weatherWeek = await weatherData.days;

  console.log(weatherData);

  for (let i = 0; i < weatherWeek.length; i++) {
    if (i === 7) {
      break;
    }
    const currentHour = weatherWeek[i].hours;
    currentHour.forEach((element) => {
      const temperature = element.temp;
      const tempInCelsius = (temperature - 32) * (5 / 9);

      const addToDisplay = new DisplayData(
        weatherWeek[i].datetime,
        element.datetime,
        Math.floor(tempInCelsius),
        element.conditions,
      );

      displayDataDOM(
        addToDisplay.condition,
        addToDisplay.date,
        addToDisplay.hour,
        addToDisplay.temp,
      );
    });
  }
}

function displayDataDOM(img, date, hour, temperature) {
  const main = document.querySelector("main");


  const container = document.createElement("div");

  const condition = document.createElement("img");
  const setDate = document.createElement("spam");
  const setHour = document.createElement("spam");
  const setTemp = document.createElement("spam");

  switch (img) {
    case "Overcast":
      condition.src = "https://img.icons8.com/fluency/96/clouds--v3.png";
      break;
    case "Clear":
      condition.src = "https://img.icons8.com/fluency/96/sun.png";
      break;
    case "Rain":
      condition.src = 'https://img.icons8.com/fluency/96/rain.png';
      break;
    case "Snow":
        condition.src = 'https://img.icons8.com/fluency/96/snow.png'
        break;
    case "Partially cloudy":
        condition.src = 'https://img.icons8.com/fluency/96/partly-cloudy-day.png'
        break;
    case 'Cloudy':
        condition.src = 'https://img.icons8.com/fluency/96/clouds--v3.png'
        break;
  }

  setDate.textContent = date;
  setHour.textContent = hour;
  setTemp.textContent = temperature + " °C";

  container.append(condition, setDate, setHour, setTemp);
  main.appendChild(container);
}

let choseLocation = document.querySelector("#search");
choseLocation.addEventListener('input', loadData);
