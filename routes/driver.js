const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

router.post('/update_location', async (req, res) => {
    try {
        const updated_driver = await Driver.updateOne(
            { long: req.body.long, lat: req.body.lat },
            {
                $set: { long: req.body.new_long, lat: req.body.new_lat }
            })
        res.json(updated_driver);
    } catch (error) {
        res.json({ message: error })
    }
})

router.post('/update_info', async (req, res) => {
    try {
        const updated_driver = await Driver.updateOne(
            { number: req.body.number },
            {
                $set: { name: req.body.name, gender: req.body.gender, age: req.body.age }
            })
        res.json(updated_driver);
    } catch (error) {
        res.json({ message: error })
    }
})

router.get('/get_available', async (req, res) => {
    try {
        const drivers = await Driver.find({ is_available: true });
        res.json(drivers);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;