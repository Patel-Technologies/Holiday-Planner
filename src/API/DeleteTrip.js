const DeleteTrip = async (props) => {
    return await fetch(`http://localhost:4000/api/groups/trips?tripId=${props.tripId}`, {
        method: 'DELETE',
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

export default DeleteTrip;