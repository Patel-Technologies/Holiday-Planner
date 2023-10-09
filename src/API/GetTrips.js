const GetTrips = async (props) => {
    return await fetch(`http://localhost:4000/api/groups/trips?groupId=${props.groupId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(data => data.json())
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}

export default GetTrips;