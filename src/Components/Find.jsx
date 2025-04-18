import React, { useState } from "react";
import bus1 from "../assets/bus1.jpeg";
import bus2 from "../assets/bus2.jpeg";

const buses = [
  {
    id: 1,
    route: "varur to hubli",
    start: "varur",
    destination: "hubli",
    time: "10:30 AM",
    image1: bus1,
    image2: bus2,
  },
  {
    id: 2,
    route: "varur to dharward",
    start: "varur",
    destination: "dharward",
    time: "11:00 AM",
  },
  {
    id: 3,
    route: "varur to shiggaon",
    start: "varur",
    destination: "shiggaon",
    time: "11:30 AM",
  },
  {
    id: 4,
    route: "varur to hubli",
    start: "varur",
    destination: "hubli",
    time: "12:00 PM",
  },
  {
    id: 5,
    route: "varur to hubli",
    start: "varur",
    destination: "hubli",
    time: "12:30 PM",
  },
  {
    id: 6,
    route: "varur to hubli",
    start: "hubli",
    destination: "varur",
    time: "12:30 PM",
  },
];

const Find = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!start || !destination) {
      alert("Please enter both entry point and destination.");
      return;
    }

    const filteredBuses = buses.filter((bus) => {
      const s = start.toLowerCase();
      const d = destination.toLowerCase();
      const bs = bus.start.toLowerCase();
      const bd = bus.destination.toLowerCase();

      return (bs === s && bd === d) || (bs === d && bd === s);
    });

    setResults(filteredBuses);
  };

  return (
    <div className="min-h-screen" id="FindBus">
      <div className="grid m-4 gap-7 sm:grid-cols-12 w-fit">
        {/* Left Panel */}
        <div className="min-h-[100px] rounded-lg sm:col-span-4">
          <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-black/70 py-8 px-4 shadow rounded-lg sm:px-10 text-white">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      className="block text-md font-medium text-white"
                      htmlFor="start"
                    >
                      Entry Point:
                    </label>
                    <div className="mt-1">
                      <input
                        id="start"
                        type="text"
                        list="locations"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        placeholder="Enter starting point"
                        required
                        className="block w-full px-3 py-2 border border-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      className="block text-md font-medium text-white"
                      htmlFor="destination"
                    >
                      Destination:
                    </label>
                    <div className="mt-1">
                      <input
                        id="destination"
                        type="text"
                        list="locations"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Enter destination"
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <datalist id="locations">
                    <option value="Varur" />
                    <option value="Hubli" />
                    <option value="Dharwad" />
                    <option value="Shiggaon" />
                  </datalist>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="min-h-[100px] rounded-lg shadow sm:col-span-8 md:mt-15 ">
          <section className="results-section p-4" id="results-section">
            <h2 className="text-white text-lg font-semibold ">
              Available Buses Will Be Displayed Along With Route
            </h2>

            {/* Display images only if available in results */}
            {results.length > 0 && results[0].image1 && (
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4 min-h-[200px] rounded-lg">
                <img
                  src={results[0].image1}
                  alt="Bus 1"
                  className="h-[300px] md:w-[50%] w-full rounded"
                />
                <img
                  src={results[0].image2}
                  alt="Bus 2"
                  className="h-[300px] md:w-[50%] w-full rounded"
                />
              </div>
            )}

            {/* Bus list */}
            <div id="bus-list">
              {results.length > 0 ? (
                results.map((bus) => (
                  <div
                    key={bus.id}
                    className="bg-black/60 text-white p-3 mb-2 rounded shadow font-semibold"
                  >
                    Bus ID: {bus.id}, Route: {bus.route}, Time: {bus.time}
                  </div>
                ))
              ) : (
                <p className="text-white">No buses available on this route.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Find;
