import './Navbar.css';
import logo from '../../../images/logo.svg';
import defaultPFP from '../../../images/Default_pfp.svg';
import supabase from '../../../supabaseConfig';

function Navbar({ userInfo, setUserInfo, setDisplayedPage }) {
	async function uploadImage(img) {
		const reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ image: img }),
		};

		return fetch('https://blabberbox-upload.vercel.app/upload', reqOptions).then((res) =>
			res.json().then((data) => {
				return data.image;
			})
		);
	}

	async function changeProfileImage() {
		if (document.getElementById('image').files[0] === undefined) {
			return;
		}

		let reader = new FileReader();
		reader.readAsDataURL(document.getElementById('image').files[0]); // gets input value
		reader.onloadend = async () => {
			let image = reader.result;
			image = await uploadImage(image);

			const { error } = await supabase.from('Users').update({ image: image }).eq('_id', userInfo.userID);
			const { data, error2 } = await supabase.from('Users').select().eq('_id', userInfo.userID);

			if (data[0]) {
				let user = data;
				// store user info in local storage
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
				window.location.reload();
			}
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
