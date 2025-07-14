import React from 'react';

interface SavedRoute {
  name: string;
  start: google.maps.LatLngLiteral;
  end: google.maps.LatLngLiteral;
}

interface Props {
  routes: SavedRoute[];
  onLoadRoute: (start: google.maps.LatLngLiteral, end: google.maps.LatLngLiteral) => void;
  onDeleteRoute: (name: string) => void;
}

const SavedRoutes: React.FC<Props> = ({ routes, onLoadRoute, onDeleteRoute }) => {
  return (
    <div>
      <h3 className="font-semibold text-sm mb-1">Saved Routes</h3>
      {routes.length === 0 ? (
        <p className="text-gray-500 text-sm">No saved routes yet.</p>
      ) : (
        <ul className="space-y-2">
          {routes.map((route, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
            >
              <button
                onClick={() => onLoadRoute(route.start, route.end)}
                className="text-left w-full font-medium hover:underline"
              >
                {route.name}
              </button>
              <button
                onClick={() => onDeleteRoute(route.name)}
                className="ml-2 text-red-600 hover:text-red-800 text-sm font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedRoutes;
