const TripBookData = async (props) => {
    return await fetch('http://localhost:4000/api/tripBookedData?tripId=' + props.tripId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export default TripBookData;