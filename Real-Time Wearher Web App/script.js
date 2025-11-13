async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "43a640469f520f263b64c4c35813783d"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      document.getElementById("result").innerHTML = "❌ City not found!";
    } else {

      let html = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
        <hr>
        <div id="forecast" class="forecast-container">Loading...</div>
      `;

      document.getElementById("result").innerHTML = html;

      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      if (forecastData.cod !== "200") {
        document.getElementById("forecast").innerHTML = "⚠️ Forecast not available!";
        return;
      }

      const dailyForecast = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

      let forecastHTML = "";
      dailyForecast.slice(0, 5).forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-IN', { weekday: 'short' });
        forecastHTML += `
          <div class="forecast-day">
            <p><b>${dayName}</b></p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="icon">
            <p>${day.main.temp}°C</p>
            <small>${day.weather[0].description}</small>
          </div>
        `;
      });

      document.getElementById("forecast").innerHTML = forecastHTML;
    }
  } catch (error) {
    document.getElementById("result").innerHTML = "⚠️ Error fetching data!";
  }
}

    let images = ["IMG/IMG1.jpg","IMG/IMG2.jpg","IMG/IMG3.jpg","IMG/IMG4.jpg","IMG/IMG5.jpg","IMG/IMG7.jpg","IMG/IMG8.jpg","IMG/IMG9.jpg","IMG/IMG10.jpg","IMG/IMG12.jpg","IMG/IMG13.jpg","IMG/IMG14.jpg","IMG/IMG15.jpg","IMG/IMG16.jpg"];
    let index = 0;

    function changeBackgroundAuto() {
      const nextImage = images[index];
      document.body.style.opacity = 1;

      setTimeout(() => {
        document.body.style.backgroundImage = `url('${nextImage}')`;
        document.body.style.opacity = 1;
      }, 500);

      index = (index + 1) % images.length; 
    }
    setInterval(changeBackgroundAuto, 10000);
    changeBackgroundAuto(); 
