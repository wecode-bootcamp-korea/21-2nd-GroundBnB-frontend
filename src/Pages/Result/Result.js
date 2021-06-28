import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function Result() {
  const history = useHistory();
  const location = useLocation();

  console.log('history', history);
  console.log('location', location);

  return <div>Result</div>;
}

export default Result;
