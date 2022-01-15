import React from 'react'
import { Link } from 'react-router-dom';

function Header({ errorNo }) {
  return (
    <div>
      <div className="searchbar-wrapper">
      <a href="https://www.tokopedia.com" className="logo">
          <img alt="tokopedia-logo" src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"/>
      </a>
      <div className="buttonWrapper">
          <Link to={`/error/${errorNo}`} type="button" className="register">Next Game</Link>
      </div>
        </div>
    </div>
  )
}

export default Header
