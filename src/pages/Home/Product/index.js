import React from "react";
import product from './product.png'
import electronic from './electronic.png'
import recharge from './recharge.png'
import product1 from './product1.png'
import './style.css'

const Product = () => (
    <div className="productContainer">
        <img src={recharge} alt="" />
        <img src={product}/>
        <img src={electronic} alt="" />
        <img src={product1} alt="" />
    </div>
)

export default Product