import Image from 'next/image';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';

const EventMap = ({ evt }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    width: '100%',
    height: '500px',
    zoom: 12,
  });

  useEffect(() => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(evt.address).then(
      (response) => {
        const { lat, lng } = response.results;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_NEXT);
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_NEXT}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <Marker key={evt.id} latitude={lat} longitude={lng}>
          <Image
            src="/images/pin.svg"
            width={30}
            height={30}
            alt="map marker"
          />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default EventMap;
