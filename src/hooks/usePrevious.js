import { useEffect, useRef } from 'react';

export default (value) => {
  const previousValue = useRef();
  useEffect(() => {
    previousValue.current = value;
  });
  return previousValue.current;
};
