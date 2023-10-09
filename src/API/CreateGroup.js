const CreateGroup = async (props) => {
    return await fetch('http://localhost:4000/api/groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: props.name,
            members: props.members,
            owner: props.owner,
        })
    })
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err);
        }
        );
}

export default CreateGroup;