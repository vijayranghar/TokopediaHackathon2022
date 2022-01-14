import React, { useEffect, useState, useReducer } from 'react'
import { useComponentWillMount } from '../hooks/useComponentWillMount';
const init = 2;

const reducer = (state = 2, action) => {
  const { payload } = action;
  return payload;
}
function Check() {

  const [x,setx] = useState(false);
  const [value, dispatch] = useReducer(reducer, init);

  useComponentWillMount(() => {
    console.log('Render first time willmount');
    dispatch(20);
  });

  useEffect(() => {
    console.log('Render');
  }, [])

  console.log('After render');
  return (
    <div>
      
    </div>
  )
}

export default Check
