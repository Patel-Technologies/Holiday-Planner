import { Button, Chip, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import GetAllTrips from '../API/GetAllGroups';
import SearchUsers from '../API/SearchUsers';
import CreateGroup from '../API/CreateGroup';
import CreateTrips from '../API/CreateTrips';
import GetTrips from '../API/GetTrips';
import DeleteTrip from '../API/DeleteTrip';


const GroupDialog = ({ open, handleClose }) => {
    const [options, setOptions] = React.useState([]);
    const [name, setName] = React.useState('');
    const [listNames, setListNames] = React.useState([]);
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        const APICalls = async () => {
            const res = await SearchUsers({ search: inputValue });
            setUsers(res);
            const names = res.map((item) => item.name);
            setOptions(names);
        }
        APICalls();
    }, [inputValue]);

    const handleChipDelete = (props) => {
        const name = props;
        const newList = listNames.filter((item) => item.name !== name);
        setListNames(newList);
    };

    const handleAddGroup = async () => {
        if (name === '') {
            alert("Please enter a group name");
            return;
        }
        if (listNames.length === 0) {
            alert("Please add members to the group");
            return;
        }

        const members = listNames.map((item) => item._id);
        const owner = localStorage.getItem('userId');
        // appemd owner to members
        members.push(owner);
        const res = await CreateGroup({ name, members, owner });
        console.log(res);
        setName('');
        setListNames([]);
        setValue(null);
        setInputValue('');
        handleClose();
        window.location.reload();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Group</DialogTitle>
            <DialogContent sx={{
                width: '500px'
            }}>
                <DialogContentText>
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Group Name"
                    fullWidth
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <Typography variant="body1" sx={{
                    margin: '10px 0'
                }}>
                    Add Members
                </Typography>

                {listNames.map((users) => (
                    <Chip
                        label={users.name}
                        onDelete={() => handleChipDelete(users.name)}
                        sx={{
                            margin: '0 5px 5px 0'
                        }}
                    />
                ))}
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        console.log(newValue);
                        if (!listNames.includes(newValue) && newValue != null) {
                            const user = users.find((item) => item.name === newValue);
                            setListNames([...listNames, user]);
                        }
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                        console.log(newInputValue);
                    }}
                    options={options}
                    sx={{
                        margin: '10px 0'
                    }}
                    renderInput={(params) => <TextField {...params} label="" />}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddGroup}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

const TripDialog = ({ _id, open, handleClose }) => {
    const [goingDate, setGoingDate] = React.useState('');
    const [returningDate, setReturningDate] = React.useState('');
    const [sourceCity, setSourceCity] = React.useState('');
    const [destinationCity, setDestinationCity] = React.useState('');
    const [modeOfTransport, setModeOfTransport] = React.useState('');
    const [hotelPreference, setHotelPreference] = React.useState('');
    const [budget, setBudget] = React.useState('');
    const [tripName, setTripName] = React.useState('');

    const handleAddTrip = async () => {
        if (tripName === '' || budget === '' || hotelPreference === '' || modeOfTransport === '' || destinationCity === '' || sourceCity === '' || goingDate === '' || returningDate === '') {
            alert("Please fill all the fields");
            return;
        }

        const res = await CreateTrips({
            groupId: _id,
            goingDate,
            returnDate: returningDate,
            sourceCity,
            destinationCity,
            modeOfTravel: modeOfTransport,
            hotelPreferences: hotelPreference,
            tripName,
            budget,
        });
        console.log(res);

        setBudget('');
        setDestinationCity('');
        setSourceCity('');
        setGoingDate('');
        setReturningDate('');
        setModeOfTransport('');
        setHotelPreference('');
        setTripName('');
        handleClose();
        window.location.reload();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Group</DialogTitle>
            <DialogContent sx={{
                width: '500px'
            }}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Trip Name"
                    fullWidth
                    value={tripName}
                    onChange={(e) => {
                        setTripName(e.target.value);
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Budget"
                    fullWidth
                    value={budget}
                    type='number'
                    onChange={(e) => {
                        setBudget(e.target.value);
                    }}
                />
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '10px 0'
                }}>
                    <Typography variant="body1" sx={{
                        margin: '10px 10px 10px 0'
                    }}>
                        Hotel Preference
                    </Typography>
                    <Rating
                        value={hotelPreference}
                        onChange={(event, newValue) => {
                            console.log(newValue);
                            setHotelPreference(newValue);
                        }}
                    />
                </div>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Mode of Transport"
                    fullWidth
                    value={modeOfTransport}
                    onChange={(e) => {
                        setModeOfTransport(e.target.value);
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Source City"
                    fullWidth
                    value={sourceCity}
                    onChange={(e) => {
                        setSourceCity(e.target.value);
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Destination City"
                    fullWidth
                    value={destinationCity}
                    onChange={(e) => {
                        setDestinationCity(e.target.value);
                    }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{
                            margin: '10px 0',
                            width: '100%'
                        }}
                        label="Going Date"
                        value={goingDate}
                        onChange={(newValue) => {
                            setGoingDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        minDate={dayjs()}
                    />
                    <DatePicker
                        sx={{
                            margin: '10px 0',
                            width: '100%'
                        }}
                        label="Returning Date"
                        value={returningDate}
                        onChange={(newValue) => {
                            setReturningDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        minDate={dayjs()}
                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setBudget('');
                    setDestinationCity('');
                    setSourceCity('');
                    setGoingDate('');
                    setReturningDate('');
                    setModeOfTransport('');
                    setHotelPreference('');
                    setTripName('');
                    handleClose();
                }}>Cancel</Button>
                <Button onClick={handleAddTrip}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

const AccordionItem = ({ _id, title, members }) => {
    const [TripDialogOpen, TripDialogSetOpen] = React.useState(false);
    const [allTrips, setAllTrips] = React.useState([]);

    const handleClickTripDialogOpen = () => {
        TripDialogSetOpen(true);
    };

    const handleTripDialogClose = () => {
        TripDialogSetOpen(false);
    };

    React.useEffect(() => {
        const APICalls = async () => {
            const res = await GetTrips({ groupId: _id });
            console.log(res);
            setAllTrips(res);
        }
        APICalls();
    }, []);

    return (
        <Accordion sx={{
            width: '60%',
        }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>{title}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{members} members</Typography>
                <Button variant="outlined" color="primary" sx={{
                    marginLeft: 'auto',
                    marginRight: '10px'
                }}
                    onClick={() => {
                        handleClickTripDialogOpen();
                    }}>
                    Add Trip
                </Button>

            </AccordionSummary>
            <AccordionDetails>
                <Typography sx={{
                    marginBottom: '10px'
                }}>
                    {allTrips.length !== 0 && (
                        <Typography sx={{
                            margin: '10px 0'
                        }}>
                            Here are your trips:
                        </Typography>
                    )}
                    {allTrips.length === 0 && (
                        <Typography sx={{
                            margin: '10px 0'
                        }}>
                            No trips found
                        </Typography>
                    )}
                    {allTrips.map((item) => (
                        <TripCards
                            _id={item._id}
                            sourceCity={item.sourceCity}
                            destinationCity={item.destinationCity}
                            goingDate={item.goingDate.slice(0, 10)}
                            returningDate={item.returnDate.slice(0, 10)}
                            modeOfTravel={item.modeOfTravel}
                            hotelPreferences={item.hotelPreferences}
                            budget={item.budget}
                            status={item.boolFind ? "Found" : "Not Found"}
                        />
                    ))}
                </Typography>
            </AccordionDetails>
            <TripDialog _id={_id} open={TripDialogOpen} handleClose={handleTripDialogClose} />
        </Accordion>
    )
}

const TripCards = (props) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ minWidth: 275, margin: '10px 0' }}>
            <CardContent>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        From: {props.sourceCity}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        To: {props.destinationCity}
                    </Typography>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        Going Date: {props.goingDate}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        Returning Date: {props.returningDate}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        Mode of Travel: {props.modeOfTravel}
                    </Typography>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        Budget: {props.budget}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        Status: {props.status}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        Hotel Preference: {props.hotelPreferences} ★
                    </Typography>
                </div>

            </CardContent>
            <CardActions>
                {props.status === "Found" && (
                <Button size="small"
                    onClick={() => {
                        navigate('/viewer', { state: { tripId: props._id } });
                    }}
                >View</Button>
                 )} 
                {/* <Button size="small"
                    onClick={() => {

                    }}
                >Edit</Button> */}
                <Button size="small"
                    onClick={async () => {
                        await DeleteTrip({ tripId: props._id });
                        window.location.reload();
                    }}
                >Delete</Button>
            </CardActions>
        </Card>
    );
}


const Home = () => {
    const [GroupDialogOpen, GroupDialogSetOpen] = React.useState(false);
    const [allGroups, setAllGroups] = React.useState([]);

    const handleClickGroupDialogOpen = () => {
        GroupDialogSetOpen(true);
    };

    const handleGroupDialogClose = () => {
        GroupDialogSetOpen(false);
    };

    React.useEffect(() => {
        const APICalls = async () => {
            const res = await GetAllTrips({ userId: localStorage.getItem('userId') });
            setAllGroups(res);
            console.log(res);
        }
        APICalls();
    }, []);

    return (
        <Grid container sx={{
            width: '100%',
            height: '100%',
            margin: '0',
            padding: '0'
        }}>
            <Grid item xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h3">
                    Groups
                </Typography>
                <Button variant="outlined" color="primary" sx={{ margin: "10px 0" }}
                    onClick={() => {
                        handleClickGroupDialogOpen();
                    }}
                >
                    Create Group
                </Button>
                {allGroups.map((item) => (
                    <AccordionItem _id={item._id} title={item.name} members={item.members.length} />
                ))}
            </Grid>
            <GroupDialog open={GroupDialogOpen} handleClose={handleGroupDialogClose} />
        </Grid>
    )
}

export default Home;