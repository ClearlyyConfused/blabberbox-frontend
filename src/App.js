import './App.css';
import { useState } from 'react';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Main from './Pages/Main/Main';

// controls which component to display according to displayedPage
// gets userID from Login, then passes it into Main
function App() {
	// displayedPage: useState for displayed page
	// initially login page
	const [displayedPage, setDisplayedPage] = useState('Login');

	// userInfo: useState for logged in user's info
	// initially undefined
	const [userInfo, setUserInfo] = useState();

	// if displayedPage = Login, return Login component
	// Login component takes in setUserInfo and updates userInfo when logged in
	if (displayedPage === 'Login') {
		return <Login setDisplayedPage={setDisplayedPage} setUserInfo={setUserInfo} />;
	}

	// if displayedPage = Register, return Register component
	if (displayedPage === 'Register') {
		return <Register setDisplayedPage={setDisplayedPage} />;
	}

	// after logging in, displayedPage = Main, return Main component
	// Main component takes in userInfo obtained from Login component
	if (displayedPage === 'Main') {
		return <Main userInfo={userInfo} />;
	}
}

export default App;
