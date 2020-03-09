const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const Applicationsontrolle = require('../controllers/ApplicationsController');

const errorHandler = require('../middlewares/errors');

router.get('/', PagesController.home);

router.post('/applications',
    Applicationsontrolle.validate,
    Applicationsontrolle.checkValidation,
    Applicationsontrolle.normalizeData,
    errorHandler.catchAsync(Applicationsontrolle.store));

module.exports = router;