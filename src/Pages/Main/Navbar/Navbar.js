import './Navbar.css';
import logo from '../../../images/logo.svg';
import defaultPFP from '../../../images/Default_pfp.svg';

function Navbar({ userInfo, setUserInfo, setDisplayedPage }) {
	function changeProfileImage() {
		if (document.getElementById('image').files[0] === undefined) {
			return;
		}

		let reader = new FileReader();
		reader.readAsDataURL(document.getElementById('image').files[0]); // gets input value
		reader.onloadend = () => {
			const image = reader.result;

			const reqOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userID: userInfo.userID,
					image: image,
				}),
			};

			fetch('https://blabberbox-backend.vercel.app/changeProfileImage', reqOptions).then((res) =>
				res.json().then((data) => {
					const reqOptions = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							username: userInfo.username,
							password: userInfo.password,
						}),
					};

					fetch('https://blabberbox-backend.vercel.app/getUser', reqOptions)
						.then((res) => res.json())
						.then((user) => {
							setUserInfo({
								userID: user[0]._id,
								username: user[0].username,
								password: user[0].password,
								chats: user[0].chats,
								image: user[0].image,
							});
							localStorage.setItem(
								'userInfo',
								JSON.stringify({
									userID: user[0]._id,
									username: user[0].username,
									password: user[0].password,
									chats: user[0].chats,
									image: user[0].image,
								})
							);
						});
				})
			);
		};
	}

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
