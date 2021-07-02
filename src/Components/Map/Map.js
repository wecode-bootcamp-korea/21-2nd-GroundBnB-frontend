import React, { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../Card/Card';

function Map({ rooms: coords }) {
  const location = useLocation();
  const [map, setMap] = useState(null);
  const mapRef = useRef();

  const seoulCenter = {
    lat: 37.56105185979463,
    lng: 126.98849708465438,
  };

  const setCenterPoints = () => {
    if (coords) {
      const latValue =
        coords
          .map((obj) => {
            return Number(obj.geo.lat);
          })
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
          ) / coords.length;

      const lngValue =
        coords
          .map((obj) => Number(obj.geo.lng))
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
          ) / coords.length;

      return { lat: latValue, lng: lngValue };
    }

    return seoulCenter;
  };

  const options = {
    center: setCenterPoints(),
    zoom: 10,
  };

  const addMarkers = (point) => {
    const { google } = window;

    const icon = {
      path: 'm8 10.5005941c0-.82930697.67155309-1.5005941 1.5-1.5005941.8284469 0 1.5.67128713 1.5 1.5005941 0 .8281188-.6715531 1.4994059-1.5 1.4994059-.82844691 0-1.5-.6712871-1.5-1.4994059zm4.1667406-8.44681501c-.0992881-.07170545-.2338787-.07170545-.3331668 0l-8.41742741 5.00062819c-.45120941.32653562-.55049754.95644047-.2239499 1.4065301.19636987.27358389.50416308.41699481.8152659.41699481h1.46063878v10.83083331c0 .1610615.13017777.2912345.29234839.2912345h5.80394304c.1246618 0 .2250531-.1003876.2250531-.2250448v-4.6983621c0-.8108233.8803548-1.4683071 1.6912079-1.4683071s1.7485744.6574838 1.7485744 1.4683071v4.6983621c0 .1246572.1014945.2250448.2250531.2250448h2.786687c.1610674 0 .2923483-.130173.2923483-.2912345v-10.83083331l1.4804964-.00006898c.3033805 0 .6023481-.1499609.7943051-.41692583.3265477-.45008963.2261563-1.07999448-.2239499-1.4065301z',
      fillColor: 'black',
      fillOpacity: 1,
      anchor: new google.maps.Point(0, 0),
      strokeWeight: 1,
    };

    if (google) {
      const marker = new window.google.maps.Marker({
        position: { lat: Number(point.geo.lat), lng: Number(point.geo.lng) },
        map,
        title: Math.floor(point.room_price).toLocaleString(),
        icon,
      });

      const infowindow = new window.google.maps.InfoWindow({
        content: ReactDOMServer.renderToString(
          <a href={`/detail/${point.room_id}${location.search}`}>
            <Card room={point} />
          </a>,
        ),
      });

      google.maps.event.addListener(map, 'click', () => {
        infowindow.close();
      });

      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: true,
        });
      });
    }
  };

  useEffect(() => {
    const init = () => {
      setMap(new window.google.maps.Map(mapRef.current, options));
    };

    if (!window.google) {
      const script = document.createElement(`script`);
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
      document.head.append(script);
      script.addEventListener(`load`, init);

      return () => script.removeEventListener(`load`, init);
    }
    init();
  }, [coords]);

  useEffect(() => {
    if (map) {
      coords?.forEach((point) => addMarkers(point));
    }
  }, [map]);

  return <MapWrap id="map" ref={mapRef} />;
}

export default Map;

const MapWrap = styled.div`
  height: 800px;
`;
