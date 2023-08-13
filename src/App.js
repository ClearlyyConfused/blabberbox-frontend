import './App.css';
import { useEffect, useState } from 'react';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Main from './Pages/Main/Main';

// controls which component (login/register/main) to display according to displayedPage
// gets userInfo from Login, then passes it into Main
function App() {
	// sets current page display
	const [displayedPage, setDisplayedPage] = useState('Login');
	// obtained from login component
	const [userInfo, setUserInfo] = useState();

	console.log(userInfo);

	useEffect(() => {
		if (localStorage.userInfo !== undefined) {
			setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
			setDisplayedPage('Main');
		}
	}, []);

	// for user login and sets userInfo
	if (displayedPage === 'Login') {
		return <Login setDisplayedPage={setDisplayedPage} setUserInfo={setUserInfo} />;
	}

	// for registering users
	if (displayedPage === 'Register') {
		return <Register setDisplayedPage={setDisplayedPage} setUserInfo={setUserInfo} />;
	}

	// after logging in, displayedPage = Main, returns the actual chatting app
	if (displayedPage === 'Main') {
		return <Main userInfo={userInfo} setUserInfo={setUserInfo} setDisplayedPage={setDisplayedPage} />;
	}
}

export default App;
