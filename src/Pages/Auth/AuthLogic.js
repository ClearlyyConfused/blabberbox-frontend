import HelperFunctions from '../../HelperFunctions';

function AuthLogic() {
	const { updateUserInfoHelper } = HelperFunctions();

	async function login(username, password, setUserInfo, setDisplayedPage) {
		await updateUserInfoHelper(username, password, setUserInfo);
		setDisplayedPage('Main');
	}

	return { login };
}

export default AuthLogic;
