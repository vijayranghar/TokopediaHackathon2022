import React from 'react'
import Header from './Header'
import Banner from './Banner'
import Recharge from './Recharge'
import Product from './Product'
import './style.css'

function HomePage() {
  return (
    <div>
      <Header/>
      <Banner/>
      <Product />
    </div>
  )
}

export default HomePage;
