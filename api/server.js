const express = require( 'express' );
const path = require( 'path' );
require('dotenv').config()


const app = express();
const { getCampaigns, activeCampaigns , closedCampaigns} = require("./service.js")

//Routers
app.get('/health', ( req, res ) => {
    res.send("We are working fine!")
});

app.get('/campaigns', getCampaigns);

app.get('/activeCampaigns', activeCampaigns);

app.get('/closedCampaigns', closedCampaigns);

// serve express application
app.listen( process.env.APP_PORT, () => console.log( `Server started on port: ${process.env.APP_PORT}` ) );
