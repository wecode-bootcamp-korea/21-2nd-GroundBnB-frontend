import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Map from '../../Components/Map/Map';

function Result() {
  const location = useLocation();
  const [roomData, setRoomData] = useState([]);

  // useEffect(() => {
  //   fetch(`http://10.58.6.210:8000/rooms${location.search}`, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setRoomData(result.rooms.rooms);
  //     });
  // }, []);

  useEffect(() => {
    fetch('./data/roomData.json')
      .then((res) => res.json())
      .then((result) => {
        setRoomData(result.rooms.rooms);
      });
  }, []);

  return (
    <div>
      <Map rooms={roomData} />
    </div>
  );
}

export default Result;
