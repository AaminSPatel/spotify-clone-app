import './Footer1.css'
import { FaFacebook, FaInstagram,FaTwitter} from "react-icons/fa6";

function footer(){
    return(
        <footer id='footer1'>
        <div className='fo-2'>
          <div className='fo-2-1'>
            <h4>Company</h4>
            <ul>
              <li className='folitem'>About</li>
              <li className='folitem'>Jobs</li>
              <li className='folitem'>For the Record</li>
            </ul>
          </div>
          <div className='fo-2-2'>
            <h4>Communities</h4>
            <ul>
              <li className='folitem'>For Artists</li>
              <li className='folitem'>Developers</li>
              <li className='folitem'>Advertising</li>
              <li className='folitem'>Investors</li>
              <li className='folitem'>Vendors</li>
            </ul>
          </div>
        </div>
        <div className='fo-3'>
        <div className='fo-3-1'>
            <h4>Useful Links</h4>
            <ul>
              <li className='folitem'>Support</li>
              <li className='folitem'>For Mobile App</li>
            </ul>
          </div>
          <div className='fo-3-2'>
            <h4>Spotify Plans</h4>
            <ul>
              <li className='folitem'>Premium Individual</li>
              <li className='folitem'>Premium Duo</li>
              <li className='folitem'>Premium Family</li>
              <li className='folitem'>Premium Student</li>
              <li className='folitem'>Spotify Free</li>
            </ul>
          </div>
        </div>
        <div className='fo-1'>
        <ul className='logo-list'>
          <li><FaFacebook/></li>
          <li><FaInstagram/></li>
          <li><FaTwitter/></li>
        </ul>
          
        </div>
        <hr />
        <div className="fot4">
          
        <p className='foterPara'>&copy;Aaminpatel 2024: Designed and Developed by me.</p>
        </div>
        </footer>
    );
}
export default footer