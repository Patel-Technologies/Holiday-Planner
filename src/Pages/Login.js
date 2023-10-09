import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, Grid, InputAdornment, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Register from '../API/Register';
import LoginAPI from '../API/LoginAPI';
import GetProfile from '../API/GetProfile';
import UpdateProfile from '../API/UpdateProfile';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = (props) => {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [gender, setGender] = React.useState('Male');
    const [dob, setDob] = React.useState(new Date().toISOString().slice(0, 10));
    const [email, setEmail] = React.useState('');

    return (
        <Container maxWidth="sm"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                flexDirection: 'column'
            }}
        >
            <Typography variant="h3" gutterBottom>
                Setup your Profile
            </Typography>
            <TextField
                label="Name"
                variant="outlined"
                margin="normal"
                required
                sx={{ width: '60%' }}
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <TextField
                label="Age"
                type='number'
                variant="outlined"
                margin="normal"
                required
                sx={{ width: '60%' }}
                value={age}
                onChange={(event) => setAge(event.target.value)}
            />
            <FormControl sx={{
                width: '60%',
                marginTop: '10px',
            }} >
                <InputLabel >Gender</InputLabel>
                <Select
                    value={gender}
                    label="Gender"
                    onChange={(event) => setGender(event.target.value)}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Date of Birth"
                type='date'
                variant="outlined"
                margin="normal"
                required
                sx={{ width: '60%' }}
                value={dob}
                onChange={(event) => {
                    console.log(event.target.value)
                    setDob(event.target.value)
                }}
            />
            <TextField
                label="Email"
                type='email'
                variant="outlined"
                margin="normal"
                required
                sx={{ width: '60%' }}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <Button
                sx={{
                    width: '60%',
                    borderRadius: '20px',
                    marginTop: '10px',
                    backgroundColor: 'blue',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'blue',
                        color: 'white',
                    },
                }}
                variant="outlined"
                onClick={async () => {
                    console.log(name, age, gender, dob, email)
                    if (name == "" || age == "" || gender == "" || dob == "" || email == "") {
                        console.log('Please fill all the fields');
                        alert('Please fill all the fields');
                        return;
                    }
                    const userId = localStorage.getItem('userId');
                    const res = await UpdateProfile({
                        name: name,
                        age: age,
                        gender: gender,
                        dob: dob,
                        email: email,
                        userId: userId
                    });
                    console.log(res);
                    if (res.message != "User profile updated successfully") {
                        props.navigate('/login');
                        return;
                    }
                    props.navigate('/');
                }}
            >
                Submit
            </Button>
        </Container>
    )
}

const Login = () => {
    const [number, setNumber] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [buttonHighlight, setButtonHighlight] = React.useState(false);
    const [snackbarOpen, snackbarSetOpen] = React.useState(false);
    const [pageIndex, setPageIndex] = React.useState(0);

    const navigate = useNavigate();

    const handleChangeNumber = (event) => {
        setNumber(event.target.value);
        if (event.target.value.length >= 10) {
            setButtonHighlight(true);
        }
        else {
            setButtonHighlight(false);
        }
    }

    const handleChangeOTP = (event) => {
        setOtp(event.target.value);
        if (event.target.value.length == 4) {
            setButtonHighlight(true);
        }
        else {
            setButtonHighlight(false);
        }
    }

    const handleSnackbarClick = () => {
        snackbarSetOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        snackbarSetOpen(false);
    };

    return (
        <>
            <Grid container>
                <Grid xs={6}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'lightblue',
                        height: '100vh'
                    }}
                >
                </Grid>
                <img src="https://i.imgur.com/Cg0Wia8.png" alt="login"
                    style={{
                        position: 'absolute',
                        width: '50%',
                        height: '100%'
                    }}
                />
                <Grid xs={6}>
                    {pageIndex === 0 &&
                        <Container maxWidth="sm"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100vh',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography variant="h3" gutterBottom>
                                Login
                            </Typography>
                            <TextField
                                label="Phone Number"
                                type='number'
                                variant="outlined"
                                margin="normal"
                                required
                                sx={{ width: '60%' }}
                                value={number}
                                onChange={handleChangeNumber}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                                }}
                            />
                            <Button
                                sx={{
                                    width: '60%',
                                    borderRadius: '20px',
                                    marginTop: '10px',
                                    backgroundColor: buttonHighlight ? 'blue' : 'lightblue',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: buttonHighlight ? 'blue' : 'lightblue',
                                        color: 'white',
                                    },
                                }}
                                variant="outlined"
                                onClick={async () => {
                                    if (buttonHighlight) {
                                        console.log('OTP sent to ' + number);
                                        const FullNumber = "+91" + number;
                                        console.log(FullNumber);
                                        const res = await Register({ mobileNumber: FullNumber });
                                        console.log(res);
                                        handleSnackbarClick();
                                        setPageIndex(1);
                                        setButtonHighlight(false);
                                    }
                                }}
                            >
                                Send OTP
                            </Button>
                        </Container>
                    }
                    {pageIndex == 1 &&
                        <Container maxWidth="sm"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100vh',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography variant="h3" gutterBottom>
                                Login
                            </Typography>
                            <TextField
                                label="OTP"
                                type='number'
                                variant="outlined"
                                margin="normal"
                                required
                                sx={{ width: '60%' }}
                                value={otp}
                                onChange={handleChangeOTP}
                            />
                            <Button
                                sx={{
                                    width: '60%',
                                    borderRadius: '20px',
                                    marginTop: '10px',
                                    backgroundColor: buttonHighlight ? 'blue' : 'lightblue',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: buttonHighlight ? 'blue' : 'lightblue',
                                        color: 'white',
                                    },
                                }}
                                variant="outlined"
                                onClick={async () => {
                                    if (buttonHighlight) {
                                        console.log('OTP entered ' + otp);
                                        const res = await LoginAPI({ mobileNumber: "+91" + number, otpCode: otp });
                                        console.log(res);
                                        localStorage.setItem('userId', res.userId);
                                        const profileCheck = await GetProfile({ userId: res.userId });
                                        console.log(profileCheck);
                                        if (profileCheck.email == undefined) {
                                            setPageIndex(2);
                                        }
                                        else {
                                            navigate('/');
                                        }
                                        setButtonHighlight(false);
                                    }
                                }}
                            >
                                Submit
                            </Button>
                        </Container>
                    }
                    {pageIndex == 2 &&
                        <Profile navigate={navigate} />
                    }
                </Grid>
            </Grid>

            <Snackbar open={snackbarOpen} autoHideDuration={3500} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    OTP sent successfully to {number}!
                </Alert>
            </Snackbar>
        </>
    )
}

export default Login