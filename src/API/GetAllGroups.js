const GetAllTrips = async (props) => {
    console.log(props.userId)
    return await fetch(`http://localhost:4000/api/groups?userId=` + props.userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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

export default GetAllTrips;