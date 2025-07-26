import "./Navbar.css"
import navlogo from "../../assets/nav-logo.png"
import navProfile from "../../assets/admin.png"

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className='nav-logo'/>
        <div className="navinfo">
          <p className="nav-name"></p>
          <img src={navProfile} alt="" className='nav-profile'/>

        </div>
        



    </div>
    

  )
}

export default Navbar