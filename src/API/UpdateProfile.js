const UpdateProfile = async (props) => {
    return await fetch('http://localhost:4000/api/user/profile', {
        method: 'POST',
        body: JSON.stringify(props),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => console.log(err));
}

export default UpdateProfile;