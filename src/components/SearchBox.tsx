import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

interface Props {
  label: string;
  onPlaceSelected: (coords: google.maps.LatLngLiteral) => void;
}

const SearchBox: React.FC<Props> = ({ label, onPlaceSelected }) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    const location = place?.geometry?.location;
    if (location) {
      onPlaceSelected({
        lat: location.lat(),
        lng: location.lng(),
      });
    }
  };

  return (
    <div style={{ margin: '0.5rem 0' }}>
      <label>{label}</label><br />
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder={`Enter ${label}`}
          style={{ width: '300px', padding: '8px' }}
        />
      </Autocomplete>
    </div>
  );
};

export default SearchBox;
