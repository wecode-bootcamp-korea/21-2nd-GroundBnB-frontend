import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API } from '../../config';
// import { GET_SUBMIT_SEARCHED_ROOMS_API } from '../../config';
import Map from '../../Components/Map/Map';

function Result() {
  const location = useLocation();
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    fetch(`${API}${location.search}`, {
      // fetch(`${GET_SUBMIT_SEARCHED_ROOMS_API}${location.search}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((result) => {
        setRoomData(result.rooms.rooms);
      });
  }, [location.search]);

  // Mock Data fetch
  // useEffect(() => {
  //   fetch('./data/roomData.json')
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log('result page', result.rooms.rooms);
  //       setRoomData(result.rooms.rooms);
  //     });
  // }, []);

  return <div>{roomData.length && <Map rooms={roomData} />}</div>;
}

export default Result;
