import React from 'react'
import View from './Components/View';
import './style.css';
import Header from './Header';

function Memory() {
  return (
    <div>
        <Header errorNo={2} />
        <View />
    </div>
  )
}

export default Memory
