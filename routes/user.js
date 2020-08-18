const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/update_info', async (req, res) => {
    try {
        const updated_driver = await User.updateOne(
            {/*condition*/ },
            {
                $set: { /* new values */ }
            })
        res.json(updated_driver);
    } catch (error) {
        res.json({ message: error })
    }
})