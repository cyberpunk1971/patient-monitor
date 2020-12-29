const express = require('express');
const {requireAuth} = require('../auth/auth');
const { check } = require('express-validator');

const router = express.Router();

const medicationsControllers = require('../controllers/medications-controllers');

router.get('/:pid', requireAuth, medicationsControllers.getMedicationsById);

router.post('/:pid', requireAuth, 
check('name').not().isEmpty(),
medicationsControllers.addNewMedication);

router.delete('/:pid/:mid', requireAuth, medicationsControllers.deleteMedication);



// router.get('/patients/:mid', (req, res, next) => {
//     const userId = req.params.uid;

//     const medication = DUMMY_MEDICATIONS.find(m => {
//         return m.user === userId;
//     });
//     res.json({medication});
// });

module.exports = router;