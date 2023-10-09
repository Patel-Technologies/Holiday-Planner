import React from 'react'
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Card, CardActions, CardContent } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';
import TripBookData from '../API/TripBookData';

const HotelCards = (props) => {
    return (
        <Card sx={{ width: '80%', margin: '10px' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.hotelName}
                </Typography>
                <Typography variant="button" component="div">
                    {props.hotelAddress}
                </Typography>
                <Typography variant="body1">
                    Cost per night per person: {props.pernight} INR
                </Typography>
                <Typography variant="body1">
                    Star Rating: {props.starRating}
                </Typography>
                <Typography variant="body1">
                    Amentities:
                    <ul style={{marginTop:'-1px'}}>
                        {props.amentities?.map((item, index) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })}
                    </ul>
                </Typography>
                {/* <Typography variant="body1">
                    Total: {props.total} INR
                </Typography> */}
            </CardContent>
        </Card>
    )
}

const TravelCards = (props) => {
    return (
        <Card sx={{ width: '80%', margin: '10px' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.from} → {props.to}
                </Typography>
                <Typography variant="button" component="div">
                    {props.modeOfTravel}
                </Typography>
                <Typography variant="body1">
                    Company: {props.travelCompanyName}
                </Typography>
                <Typography variant="body1">
                    Book on: {props.appName}
                </Typography>
                <Typography variant="body1">
                    Total: {props.total} INR
                </Typography>
            </CardContent>
        </Card>
    )
}

const AccordionItinearary = (props) => {
    return (
        <Accordion sx={{
            width: '60%',
        }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <Typography sx={{ width: '50%', flexShrink: 0 }}>{props.data.travel.sourceCity} to {props.data.travel.destCity}</Typography>
                <Typography sx={{ color: 'text.secondary', marginLeft: 'auto' }}>Total Budget: {props.data.total}</Typography>
                <Button sx={{ marginLeft: 'auto' }} variant='outlined'>Book</Button>
            </AccordionSummary>
            <AccordionDetails>
                <Typography sx={{
                    marginBottom: '10px'
                }}>
                    <Grid container>
                        <Grid item xs={12} md={6} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                            <HotelCards hotelName={props.data.hotel.hotelName} hotelAddress={props.data.hotel.address} pernight={props.data.hotel.costPerNightPerPerson} starRating={props.data.hotel.starRating} amentities={props.data.hotel.amenities} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                            <TravelCards from={props.data.travel.sourceCity} to={props.data.travel.destCity} modeOfTravel={props.data.travel.modeOfTravel} travelCompanyName={props.data.travel.travelCompanyName} appName={props.data.travel.bookingAppName} total={props.data.travel.price} />
                        </Grid>
                    </Grid>
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

const Viewer = () => {
    const location = useLocation();
    const tripId = location.state.tripId;
    // const tripId = "6522f17a1dcba267745fc79e"
    const [tripData, setTripData] = React.useState([{
        tripName: "",
        sourceCity: "",
        destinationCity: "",
        goingDate: "",
        returnDate: "",
        journeyDetails: [
            {
                travel: {
                    sourceCity: "",
                    destCity: "",
                    modeOfTravel: "",
                    travelCompanyName: "",
                    appName: "",
                    total: ""
                },
                hotel: {
                    hotelName: "",
                    address: "",
                    costPerNightPerPerson: "",
                    starRating: "",
                    amentities: "",
                    total: ""
                },
                total: ""
            }
        ],
        total: ""
    }]);

    React.useEffect(() => {
        const APICall = async () => {
            const res = await TripBookData({ tripId: tripId });
            console.log(res);
            setTripData(res);
        }
        APICall();
    }, [])

    return (
        <Grid container sx={{
            marginTop: '150px',
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
                <Typography sx={{
                    marginBottom: '10px'
                }} variant="h3">
                    Itinearies
                </Typography>

                <Grid container sx={{
                    display: 'flex',
                    marginBottom: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <Grid item xs={5}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="h6">
                                From: {tripData[0].sourceCity}
                            </Typography>
                            <Typography variant="h6">
                                Travel Date: {tripData[0].goingDate.slice(0, 10)} → {tripData[0].returnDate.slice(0, 10)}
                            </Typography>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="h6">
                                To: {tripData[0].destinationCity}
                            </Typography>
                            <Typography variant="h6">
                                Trip Name: {tripData[0].tripName}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>


                {tripData[0].journeyDetails.map((journey, index) => {
                    return (
                        <AccordionItinearary data={journey} />
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default Viewer