const express = require('express');
const hash = require('bcryptjs');
const Driver = require('../models/Driver');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

router.post('/user', (req, res) => {
    User.findOne({ number: req.body.number })
        .then((savesUser) => {
            if (!savesUser)
                return res.status(421).json({ error: "invalid password or email" });
            else {

                hash.compare(req.body.password, savesUser.password)
                    .then((domatch) => {
                        if (domatch) {
                            const token = jwt.sign({ _id: savesUser._id }, JWT_SECRET);
                            res.status(200).json({ token: token });
                        }
                        else {
                            res.status(422).json({ error: 'invalid password or email' });
                        }
                    });
            }
        })
        .catch((err) => console.log(err));
})


router.post('/driver', (req, res) => {
    Driver.findOne({ number: req.body.number })
        .then((savesUser) => {
            if (!savesUser)
                return res.status(422).json({ error: "invalid password or email" });
            else {

                hash.compare(req.body.password, savesUser.password)
                    .then((domatch) => {
                        if (domatch) {
                            const token = jwt.sign({ _id: savesUser._id }, JWT_SECRET);
                            res.status(200).json({ token: token });
                        }
                        else {
                            res.status(422).json({ error: 'invalid password or email' });
                        }
                    });
            }
        })
        .catch((err) => console.log(err));
})

module.exports = router;