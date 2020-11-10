const express = require('express');
const router = express.Router();

const DUMMY_MEDICATIONS = [
    {
        id: 'm1',
        name: 'Tylenol',
        patient: 'John Doe'
    }

];

router.get('/:mid', (req, res, next) => {
    const medId = req.params.mid;
    
    const medication = DUMMY_MEDICATIONS.find(m => {
        return m.id === medId;
    });
    res.json({
        medication
    });
});

router.get('/patients/:mid', (req, res, next) => {
    const userId = req.params.uid;

    const medication = DUMMY_MEDICATIONS.find(m => {
        return m.user === userId;
    });
    res.json({medication});
});

module.exports = router;