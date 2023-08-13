import HelperFunctions from '../../HelperFunctions/HelperFunctions';

function AuthLogic() {
	const { updateUserInfo } = HelperFunctions();

	async function login(username, password, setUserInfo, setDisplayedPage) {
		await updateUserInfo(username, password, setUserInfo);
		setDisplayedPage('Main');
	}

	return { login };
}

export default AuthLogic;
