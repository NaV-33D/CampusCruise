import React, { useState } from 'react';

const buses = [
  { id: 1, route: 'varur to hubli', start: 'varur', destination: 'hubli', time: '10:30 AM' },
  { id: 2, route: 'varur to dharward', start: 'varur', destination: 'dharward', time: '11:00 AM' },
  { id: 3, route: 'varur to shiggaon', start: 'varur', destination: 'shiggaon', time: '11:30 AM' },
  { id: 4, route: 'varur to hubli', start: 'varur', destination: 'hubli', time: '12:00 PM' },
  { id: 5, route: 'varur to hubli', start: 'varur', destination: 'hubli', time: '12:30 PM' },
  { id: 6, route: 'varur to hubli', start: 'hubli', destination: 'varur', time: '12:30 PM' },

];

const Find = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!start || !destination) {
      alert('Please enter both entry point and destination.');
      return;
    }

    const filteredBuses = buses.filter(
      (bus) =>
        bus.start.toLowerCase() === start.toLowerCase() &&
        bus.destination.toLowerCase() === destination.toLowerCase()
    );

    setResults(filteredBuses);
  };

  return (
    <div className="h-screen" id='FindBus'>
      <div className="grid m-4 gap-7 sm:grid-cols-12 w-fit">
        {/* Left Panel */}
        <div className="min-h-[100px] rounded-lg sm:col-span-4">
          <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10 text-white">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-md font-medium text-white" htmlFor="start">
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
                        className="input block w-full px-3 py-2 border border-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-md font-medium text-white" htmlFor="destination">
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
                        className="input block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <div className="min-h-[100px] rounded-lg shadow  sm:col-span-8">
          <section className="results-section p-4" id="results-section">
            <h2 className="text-white text-lg font-semibold mb-4">Available Buses Will Be Displayed Along With Route</h2>

            <div className='flex flex-col md:flex-row justify-center items-center gap-4 mb-4 min-h-[200px]  bg-amber-300 rounded-lg'>
                <img src="" alt="1" className='bg-red-700 h-[300px] md:w-[50%] w-full'/>
                <img src="" alt="2" className='bg-green-700 h-[300px] md:w-[50%] w-full'/>
            </div>


            <div id="bus-list">
              {results.length > 0 ? (
                results.map((bus) => (
                  <div key={bus.id} className="bg-white p-3 mb-2 rounded shadow font-semibold">
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
