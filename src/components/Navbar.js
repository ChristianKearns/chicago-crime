import { Link } from "react-router-dom";
import '../styling/nav.css';

export default function Navbar() {
    return(
      <nav className="container">
        <Link
            className="logo"
            to=''
        >
            <div className="heading">Chicago Crime</div>
            <div className="sub-heading">Data Explorer</div>
        </Link>
        <div className="link-container">
            <Link
                className="link"
                to='/'
            >
                Home
            </Link>
            <Link
                className="link"
                to='/trends/defaulttrend'
            >
                Trends
            </Link>
            <Link
                className="link"
                to='map'
            >
                Map
            </Link>
        </div>
      </nav>
    )
  }