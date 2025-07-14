import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import Map from './components/Map';

const App = () => {

  return (
    <LoadScript
  googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
  libraries={['places']}
>
  <Map />
</LoadScript>
  );
};

export default App;
