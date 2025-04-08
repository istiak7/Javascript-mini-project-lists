const apiKey = '583785cc6b02df4971a98e5b3a17efc6'; 

document.getElementById('getWeatherBtn').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value;
  if (!city) return alert('Please enter a city');

  const resultDiv = document.getElementById('weatherResult');
  resultDiv.innerHTML = 'Loading...';

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (res.status === 401) throw new Error('Invalid API key');
    if (!res.ok) throw new Error('City not found');

    const data = await res.json();
    console.log(data);
    resultDiv.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>🌥️ Weather: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
});
