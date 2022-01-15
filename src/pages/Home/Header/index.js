import React from "react";
import './style.css'
import { Link } from 'react-router-dom';
import { shuffleArray } from '../../ErrorGame/pages/MemoryGame/constants'

const Header = () => (
    <div className="header">
        <div className="navbar">
            <div>
                <span className='download'/>
                <a href="https://www.tokopedia.com/mobile-apps/" target="_blank" rel="noopener noreferrer"> Download Tokopedia App</a>
            </div>
            <div className="right-nav">
                <a href="/about/" target="_blank" rel="noopener noreferrer" data-testid="btnHeaderAbout">Tentang Tokopedia</a>
                <a href="/mitra/" target="_blank" rel="noopener noreferrer" data-testid="btnHeaderMitra">Mitra Tokopedia</a>
                <a href="https://seller.tokopedia.com/edu" target="_blank" rel="noopener noreferrer" data-testid="btnHeaderSellerEdu">Pusat Edukasi Seller</a>
                <a href="/promo/" target="_blank" rel="noopener noreferrer" data-testid="btnHeaderPromo">Promo</a>
                <a href="/help/" target="_blank" rel="noopener noreferrer" data-testid="btnHeaderHelp">Tokopedia Care</a>
            </div>
        </div>
        <div className="searchbar-wrapper">
            <a href="https://www.tokopedia.com" className="logo">
                <img alt="tokopedia-logo" src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"/>
            </a>
            <div>Kategori</div>
            {/* <div className="searchbar">
                <input type="text"/>
                <button/>
            </div> */}
            <div className="buttonWrapper">
                <Link to='/offline' type="button" className="login">Offline</Link>
                <Link to={`${shuffleArray(['/error/1', 'error/2'])[0]}`} type="button" className="register">Server Error</Link>
            </div>
        </div>
        <div id="trending-popular-keywords" className="trending-list">
            <a href="https://www.tokopedia.com/find/bor-cordless">bor cordless</a>
            <a href="https://www.tokopedia.com/find/perangkap-tikus">perangkap tikus</a>
            <a href="https://www.tokopedia.com/find/card-reader">card reader</a>
            <a href="https://www.tokopedia.com/find/oppo-f9">oppo f9</a>
            <a href="https://www.tokopedia.com/find/ipad-6">ipad 6</a>
            <a href="https://www.tokopedia.com/find/container-box">container box</a>
        </div>
    </div>
)

export default Header