const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const Driver = require('../models/Driver');
const User = require('../models/User');

router.post('/get_trips_by_driver', async (req, res) => {
    try {
        const trips = await Trip.find({ driver_number: req.body.driver_number });
        res.json({ sucess: 1, data: trips });
    } catch (err) {
        res.json({ sucess: 0, message: err });
    }
})

router.post('/get_trips_by_user', async (req, res) => {
    try {
        const trips = await Trip.find({ user_number: req.body.user_number });
        res.json({ sucess: 1, data: trips });
    } catch (err) {
        res.json({ sucess: 0, message: err });
    }
})

router.post('/add_trip', async (req, res) => {
    Driver.findOne({ number: req.body.driver_number })
        .then((savesDriver) => {
            if (!savesDriver)
                return res.status(422).json({ error: "invalid Driver" });
            else {
                User.findOne({ number: req.body.user_number })
                    .then((savesUser) => {
                        if (!savesUser)
                            return res.status(422).json({ error: "invalid User" });
                        else {
                            const trip = new Trip({
                                driver_number: req.body.driver_number,
                                user_number: req.body.user_number,
                                source_lat: req.body.source_lat,
                                source_long: req.body.source_long,
                                dest_lat: req.body.dest_lat,
                                dest_long: req.body.dest_long,
                                date: req.body.date
                            });
                            try {
                                const savedTrip = trip.save()
                                res.json({ sucess: 1 })
                            } catch (error) {
                                res.json({ sucess: 0, message: error });
                            }
                        }
                    })
            }
        })
        .catch((err) => console.log(err));
})

module.exports = router;