import './Navbar.css';
import logo from '../../../images/logo.svg';
import defaultPFP from '../../../images/Default_pfp.svg';

function Navbar({ userInfo, setUserInfo, setDisplayedPage }) {
	function handleMessage(event) {
		event.preventDefault();
		let reader = new FileReader();

		reader.readAsDataURL(event.target.elements.image.files[0]);
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

			event.target.elements.image.value = '';
		};
	}

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
							localStorage.clear();
						}}
					>
						Logout
					</p>
				</div>
				<form onSubmit={handleMessage}>
					<input type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
					<button type="submit">Upload PFP</button>
				</form>
				<img src={userInfo.image ? userInfo.image : defaultPFP} alt="" />
			</div>
		</nav>
	);
}

export default Navbar;
