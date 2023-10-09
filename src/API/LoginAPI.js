const LoginAPI = async (props) => {
    return await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "mobileNumber": props.mobileNumber,
            "otpCode": parseInt(props.otpCode),
        }),
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
}

export default LoginAPI;