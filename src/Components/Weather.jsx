import React, { useEffect, useState } from "react";

const API_KEY = "7eaa4986279bd09130f859de1413dbe4";

const Weather = () => {
  const [searchCity, setSearchCity] = useState("Bangalore");
  const [searchWeather, setSearchWeather] = useState(null);
  const [fixedWeather, setFixedWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  const fixedCities = ["Hubli", "Varur"];

  const fetchWeather = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error(`Error fetching ${city}`);
    const data = await res.json();
    return data;
  };

  const handleSearch = async () => {
    if (searchCity.trim() === "") return;
    setLoading(true);
    try {
      const data = await fetchWeather(searchCity);
      setSearchWeather(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch weather.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const fetchFixedCities = async () => {
      try {
        const data = await Promise.all(fixedCities.map(fetchWeather));
        setFixedWeather(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch weather for fixed cities.");
      }
    };

    handleSearch(); // fetch for default searchCity on load
    fetchFixedCities();
  }, []);

  return (
    <div
      className="flex flex-wrap lg:flex-nowrap justify-center items-center-safe min-h-screen gap-6 p-6 bg-gray-900"
      id="Weather"
    >
      {/* First Card - Searchable */}
      <div
        className="bg-black/80 text-white p-8 rounded-3xl w-full max-w-md hover:shadow-2xl transition-shadow duration-300"
        style={{ "--tw-shadow-color": "rgba(0, 255, 255, 0.5)" }}
      >
        <div className="flex justify-center items-center mb-6">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Search"
            className="flex-1 px-4 py-2 rounded-full bg-white/20 text-white placeholder-white outline-none"
          />
          <button
            onClick={handleSearch}
            className="ml-4 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition"
            aria-label="Search"
          >
            🔍
          </button>
        </div>

        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : (
          searchWeather && (
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Weather in {searchWeather.name}
              </h2>
              <h1 className="text-4xl font-bold mb-4">
                {searchWeather.main.temp}°C
              </h1>
              <div className="flex items-center mb-2">
                <img
                  src={`https://openweathermap.org/img/wn/${searchWeather.weather[0].icon}.png`}
                  alt="weather-icon"
                />
                <div className="capitalize ml-2">
                  {searchWeather.weather[0].description}
                </div>
              </div>
              <div className="mb-1 flex">
                <svg
                  className="h-6 w-6 text-red-400 mr-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  ></path>
                </svg>{" "}
                Humidity: {searchWeather.main.humidity}%
              </div>

              <div className="flex ">
                <svg
                  className="h-6 w-6 text-cyan-500 mr-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                  ></path>
                </svg>{" "}
                Wind Speed: {searchWeather.wind.speed} km/h
              </div>
            </div>
          )
        )}
      </div>

      {/* Fixed City Cards */}
      {fixedWeather.map((weather, index) => (
        <div
          key={index}
          className="bg-black/80 text-white p-8 rounded-3xl w-full max-w-md hover:shadow-xl transition-shadow duration-400"
          style={{
            backgroundImage: `url('https://source.unsplash.com/400x300/?${weather.name}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            "--tw-shadow-color": "rgba(0, 255, 255, 0.5)",
          }}
        >
          <h2 className="text-xl font-semibold mb-2 bg-black/60 p-2 rounded">
            Weather in {weather.name}
          </h2>
          <h1 className="text-4xl font-bold mb-4  p-2 rounded">
            {weather.main.temp}°C
          </h1>
          <div className="flex items-center mb-2 p-2 rounded">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="weather-icon"
            />
            <div className="capitalize ml-2">
              {weather.weather[0].description}
            </div>
          </div>
          <div className="mb-1 p-2 rounded flex">
            <svg
              className="h-6 w-6 text-red-400 mr-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              ></path>
            </svg>
            Humidity: {weather.main.humidity}%
          </div>
          <div className="p-2 rounded flex">
            <svg
              className="h-6 w-6 text-cyan-500 mr-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
              ></path>
            </svg>
            Wind Speed: {weather.wind.speed} km/h
          </div>
        </div>
      ))}
    </div>
  );
};

export default Weather;
