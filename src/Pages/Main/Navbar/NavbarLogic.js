import HelperFunctions from '../../../HelperFunctions';
import supabase from '../../../supabaseConfig';

function NavbarLogic(userInfo, setUserInfo) {
	const { uploadImage, convertToBase64, updateUserInfoHelper } = HelperFunctions();

	async function changeProfileImage() {
		if (document.getElementById('image').files[0] !== undefined) {
			const convertedImage = await convertToBase64(document.getElementById('image').files[0]);
			let imageURL = await uploadImage(convertedImage);
			const { error } = await supabase.from('Users').update({ image: imageURL }).eq('_id', userInfo.userID);
			await updateUserInfoHelper(userInfo.username, userInfo.password, setUserInfo);
		}
	}

	return { changeProfileImage };
}

export default NavbarLogic;
