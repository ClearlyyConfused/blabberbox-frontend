import './Navbar.css';
import logo from '../../../images/logo.svg';

function Navbar({ userInfo, setUserInfo, setDisplayedPage }) {
	return (
		<nav>
			<div className="logo">
				<img src={logo} alt="" />
				<h1>BlabberBox</h1>
			</div>
			<div className="user-info">
				<div>
					<h2>Welcome {userInfo.username}</h2>
					<p
						onClick={() => {
							setDisplayedPage('Login');
							setUserInfo();
						}}
					>
						Logout
					</p>
				</div>
				<img src={logo} alt="" />
			</div>
		</nav>
	);
}

export default Navbar;
