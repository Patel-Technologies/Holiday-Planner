const Register = async (props) => {
    return await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "mobileNumber": props.mobileNumber,
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

export default Register;