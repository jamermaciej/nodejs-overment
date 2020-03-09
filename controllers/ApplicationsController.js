const Application = require('../models/application');
const { check, validationResult } = require('express-validator');
const appMailer = require('../mailers/appMailer');


exports.store = async (req, res, next) => {
    // res.json({
    //     'name': req.body.name,
    //     'phone': req.body.phone,
    //     'message:': req.body.message
    // });
    //req.flash('form', req.body.name.split(' ')[0] + ', you are a true hero!');
    
        // Application.create({
        //     'name': req.body.name,
        //     'phone': req.body.phone,
        //     'message': req.body.message
        // }).then( () => {
        //     req.flash('form', req.body.first_name + ', you are a true hero!');
        //     res.redirect('/');
    // }, () => {
    //     req.flash('form', 'Oops! Something went wrong!');
    //     res.redirect('/');
    // });
    // }).catch( () => {
    //     req.flash('form', 'Oops! Something went wrong!');
    //     res.redirect('/');
    // });
        // }).catch(next);
    // try {
    //     await Application.create({
    //         'name': req.body.name,
    //         'phone': req.body.phone,
    //         'message': req.body.message
    //     });
    // } catch (error) {
    //     return next(err);
    // }

    // alternatywa dla try { } catch () to dodanie funkcji
    // do obsługi błędów w middlewares errors.js - catchAsync
    // i dodanie jej w routes/index.js

    const application = {
        'name': req.body.name,
        'email': req.body.email.toLowerCase(),
        'message': req.body.message        
    }

    await Application.create(application);

    // send notification
    appMailer.applicationNotify({
        email: application.email,
        data: { name: application.name }
    });

    req.flash('form', req.body.first_name + ', you are a true hero!');
    res.redirect('/');
};

exports.validate = [
    check('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
    check('email').isLength({ min: 1 }).withMessage('Email is required'),
    check('message').isLength({ min: 1 }).withMessage('Message is required')
];

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.render('home', {
            validated: req.body,
            errors: errors.mapped(),
            showLightbox: 'true'
        });
    }

    next();
};

exports.normalizeData = (req, res, next ) => {
    const nameArr = req.body.name.split(' ');

    req.body.first_name = nameArr.shift();
    req.body.last_name = nameArr.join(' ');

    next();
};