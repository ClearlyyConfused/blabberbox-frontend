import './Navbar.css';
import logo from '../../../images/logo.svg';
import defaultPFP from '../../../images/Default_pfp.svg';
import NavbarLogic from './NavbarLogic';

function Navbar({ userInfo, setUserInfo, setDisplayedPage }) {
	const { changeProfileImage } = NavbarLogic(userInfo, setUserInfo);

	return (
		<nav>
			<div className="logo">
				<img src={logo} alt="" />
				<h1>BlabberBox</h1>
			</div>
			<div className="user-info">
				<div className="user-greeting">
					<h2>Welcome {userInfo.username}</h2>
					<p
						onClick={() => {
							setDisplayedPage('Login');
							setUserInfo();
							localStorage.clear();
						}}
					>
						Logout
					</p>
				</div>
				<div className="profile-image">
					<form onChange={changeProfileImage}>
						{/* submit form whenever input changes */}
						<label htmlFor="image">
							<p>Change PFP</p>
							<img src={userInfo.image ? userInfo.image : defaultPFP} alt="" />
						</label>
						<input type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
					</form>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
