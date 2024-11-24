const API_KEY = "5178f16f89e0be2d8c6ecc16427605a8"; 

document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        displayError("Please enter a city name.");
        return;
    }

    fetchWeather(city);
});

function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found.");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    document.getElementById("cityName").textContent = `Weather in ${cityName}`;
    document.getElementById("temperature").textContent = `Temperature: ${temperature}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    document.getElementById("windSpeed").textContent = `Wind Speed: ${windSpeed} m/s`;

    const weatherResult = document.getElementById("weatherResult");
    weatherResult.classList.remove("hidden");
    weatherResult.style.opacity = "0";
    weatherResult.style.transition = "opacity 0.5s ease-in-out";
    setTimeout(() => (weatherResult.style.opacity = "1"), 50);

    document.getElementById("errorMsg").classList.add("hidden");

    
    document.body.style.background = 
        temperature < 10 ? "linear-gradient(to bottom, #3b5998, #192f6a)" :
        temperature < 25 ? "linear-gradient(to bottom, #fbc2eb, #a6c1ee)" :
                           "linear-gradient(to bottom, #ff512f, #f09819)";
}

function displayError(message) {
    document.getElementById("errorMsg").textContent = message;
    document.getElementById("errorMsg").classList.remove("hidden");
    document.getElementById("weatherResult").classList.add("hidden");
}
