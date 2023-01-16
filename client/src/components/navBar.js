
import "../App.css";
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux'
import { logoutResetDetails } from "../redux/actions/userAction"
import { useDispatch } from 'react-redux'
const NavBar = () => {
    const dispatch = useDispatch()
    const { name } = useSelector(state => state.user)
    const triggerLogout = () => {
        dispatch(logoutResetDetails())
    }
    return (
        <>
            <div className="navBox1">
                <div>Take Away</div>
                <div> <FontAwesomeIcon icon={faBars} /></div>
            </div>
            <div className="navBox2">
                <div className="icon">
                    <div className="user_details">
                        <div className="user_name">{name}</div>
                        <button className="button_logout" onClick={() => triggerLogout()}>Logout</button>
                    </div>
                    <FontAwesomeIcon icon={faUser} className="user_icon" />
                </div>
            </div>
        </>
    );

}
export default NavBar;