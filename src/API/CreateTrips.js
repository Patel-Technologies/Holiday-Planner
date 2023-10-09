const CreateTrips = async (props) => {
    return await fetch(`http://localhost:4000/api/groups/trips?groupId=${props.groupId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "goingDate": props.goingDate,
            "returnDate": props.returnDate,
            "sourceCity" : props.sourceCity,
            "destinationCity": props.destinationCity,
            "modeOfTravel": props.modeOfTravel,
            "hotelPreferences": props.hotelPreferences,
            "tripName": props.tripName,
            "budget": props.budget,
        }),
    })
    .then(data => data.json())
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}

export default CreateTrips;