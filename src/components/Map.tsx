import React, { useRef, useState, useEffect } from 'react';
import {
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
  BicyclingLayer,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 33.4255,
  lng: -111.94,
};

type Route = {
  name: string;
  origin: string;
  destination: string;
  favorite: boolean;
  distance?: string;
  duration?: string;
};

const Map = () => {
  const originRef = useRef<HTMLInputElement | null>(null);
  const destRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [savedRoutes, setSavedRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('routes') || '[]');
    setSavedRoutes(saved);
    if (originRef.current) originRef.current.value = 'ASU Tempe Campus';
    if (destRef.current) destRef.current.value = 'Tempe Town Lake';
  }, []);

  const handleGetRoute = () => {
    const origin = originRef.current?.value;
    const destination = destRef.current?.value;
    const name = nameRef.current?.value || 'Untitled Route';

    if (!origin || !destination) {
      alert('Please enter both origin and destination.');
      return;
    }

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.BICYCLING,
      },
      (result, status) => {
        if (result && result.routes && result.routes.length > 0) {
          setDirections(result);

          const leg = result.routes[0].legs[0];

          const newRoute: Route = {
            name,
            origin,
            destination,
            favorite: false,
            distance: leg.distance?.text || '',
            duration: leg.duration?.text || '',
          };

          const updatedRoutes = [...savedRoutes, newRoute];
          setSavedRoutes(updatedRoutes);
          localStorage.setItem('routes', JSON.stringify(updatedRoutes));
        } else {
          alert('Could not fetch directions. Try again.');
        }
      }
    );
  };

  const handleClearRoutes = () => {
    localStorage.removeItem('routes');
    setSavedRoutes([]);
  };

  const toggleFavorite = (index: number) => {
    const updated = [...savedRoutes];
    updated[index].favorite = !updated[index].favorite;
    setSavedRoutes(updated);
    localStorage.setItem('routes', JSON.stringify(updated));
  };

  const deleteRoute = (index: number) => {
    const updated = savedRoutes.filter((_, i) => i !== index);
    setSavedRoutes(updated);
    localStorage.setItem('routes', JSON.stringify(updated));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[340px] p-6 bg-white shadow-lg rounded-lg m-4 h-fit">
        <h2 className="text-xl font-bold mb-4">🚴 Tempe Bike Route Planner</h2>

        <input
          type="text"
          ref={nameRef}
          placeholder="Route name (e.g., Morning Ride)"
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring"
        />
        <Autocomplete>
          <input
            type="text"
            placeholder="Enter origin"
            ref={originRef}
            className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring"
          />
        </Autocomplete>
        <Autocomplete>
          <input
            type="text"
            placeholder="Enter destination"
            ref={destRef}
            className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring"
          />
        </Autocomplete>

        <button
          onClick={handleGetRoute}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Get Route
        </button>

        <button
          onClick={handleClearRoutes}
          className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
        >
          Clear Saved Routes
        </button>

        {/* Saved Routes */}
        {savedRoutes.length > 0 && (
          <div className="mt-5">
            <h3 className="font-semibold mb-2">📌 Saved Routes</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {savedRoutes.map((route, index) => (
                <li
                  key={index}
                  className="flex justify-between items-start bg-gray-100 px-3 py-2 rounded"
                >
                  <div className="flex-1">
                    <div className="font-semibold truncate">{route.name}</div>
                    <div className="text-xs truncate text-gray-600">
                      {route.origin} ➝ {route.destination}
                    </div>
                    {route.distance && route.duration && (
                      <div className="text-xs text-gray-500 mt-1">
                        🛣️ {route.distance} • ⏱️ {route.duration}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end ml-2 space-y-1">
                    <button onClick={() => toggleFavorite(index)} className="text-yellow-500">
                      {route.favorite ? '⭐' : '☆'}
                    </button>
                    <button onClick={() => deleteRoute(index)} className="text-red-500 text-xs">
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="flex-1">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
          <BicyclingLayer />
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
