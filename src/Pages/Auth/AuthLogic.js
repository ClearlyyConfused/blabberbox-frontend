function AuthLogic() {
    function login(username, password, setUserInfo, setDisplayedPage, setSuccessFlag) {
        setSuccessFlag(true)
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        };

        fetch('https://blabberbox-backend.vercel.app/getUser', reqOptions)
            .then((res) => res.json())
            .then((user) => {
                if (user.success === undefined) {
                    setUserInfo({
                        userID: user[0]._id,
                        username: user[0].username,
                        password: user[0].password,
                        chats: user[0].chats,
                    });
                    setDisplayedPage('Main');
                } else {
                    setSuccessFlag(false)
                }
            });
    }

    return { login }
}

export default AuthLogic