const SearchUsers = async (props) => {
    return await fetch('http://localhost:4000/api/search/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            search: props.search
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



export default SearchUsers;