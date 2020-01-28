const express = require('express');
const router = express.Router();
const Consumer = require('../model/Consumer');
const Service = require('../model/Categories');
const Provider = require('../model/Provider');
const Skills = require('../model/Skill');
const Feedback = require('../model/Feedback'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_config = require('../jwt.config');

router.post('/register', function (req, res) {
    if (!req.body.email) {
        return res.status(400).send({
            value: 0,
            message: "Email can not be empty"
        });
    }
    else {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) console.error('There was an error', err);
            else {
                bcrypt.hash(req.body.password, salt, (err, hash) => {

                    const Customer = new Consumer({
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: hash,
                    });

                    Customer.save().then(function (consumers) {
                        if (!consumers) {
                            return res.status(400).send({
                                value: 0,
                                message: 'Not saved error'
                            });
                        }
                        else {
                            return res.status(200).send({
                                value: 1,
                                message: 'Succefully registered',
                                data: consumers
                            });
                        }
                    }).catch(function (err) {

                        return res.status(400).send({
                            value: 0,
                            message: 'Not saved error',
                            data: err,
                        });
                    })


                })
            }
        })


    }
});



router.post('/login', function (req, res) {
    if (!req.body.email) {
        return res.status(400).send({
            value: 0,
            message: "Email can not be empty"
        });
    }
    else {
        Consumer.findOne({ email: req.body.email }).then(function (consumers) {
            
            if (!consumers) {
                return res.status(400).send({
                    value: 0,
                    message: 'Email id not exits. Please Register.'
                });
            }
            else {
                bcrypt.compare(req.body.password, consumers.password).then((isMatch) => {
                    if (isMatch) {
                        const payload = {
                            id: consumers.id,
                            name: consumers.email,

                        };

                        jwt.sign(payload, jwt_config.secret, {
                            expiresIn: 3600,
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                return res.status(200).send({
                                    value: 1,
                                    message: 'Succefully login',
                                    data: consumers,
                                    token: `Bearer ${token}`,
                                });
                            }
                        });
                    }
                    else {
                       
                        return res.status(400).send({
                            value: 0,
                            message: 'Incorrect Password'
                        });
                    }
                })
            }
        })
    }
});

router.get('/services', function(req,res) {
    Service.findAll().then(function(services){
        if(!services){
            res.status(400).send({
                value: 0,
                message: "No service found"
            });
        }
        else{
            res.status(200).send({
                value: 1,
                message: "Successfull",
                Service: services
            });
        }
    });
})

router.post('/service-provider-by-id', function(req,res){
    Provider.hasMany(Skills, { sourceKey: 'id', foreignKey: 'service_provider_id' });
  //  Project.belongsTo(Client, {foreignKey: 'client_id'});

    Provider.findAll({
        
        include: [
            {
               model: Skills,
               where: {service_id: req.body.service_id} 
            }
        ]
    }).then(providers => {
        if(!providers){
            res.status(400).send({
                value: 0,
                message: "No service found"
            });
        }
        else{
            res.status(200).send({
                value: 1,
                Providers: providers
            })
        }
    });
});


router.post('/service-provider', function(req,res){

    Provider.hasMany(Skills, { sourceKey: 'id', foreignKey: 'service_provider_id' });
    Provider.hasMany(Feedback, { sourceKey: 'id', foreignKey: 'service_provider_id' });

    Provider.findByPk(req.body.service_provider_id,{
        include: [
            {
               model: Skills,
               where: {service_provider_id: req.body.service_provider_id} 
            },
            {
                model: Feedback,
                where: {service_provider_id: req.body.service_provider_id} 
             }
        ]
    }).then(service_provider => {
        if(!service_provider){
            res.status(400).send({
                value: 0,
                message: "Some error occured"
            });
        }
        else{
            res.status(200).send({
                value:1,
                message: "successfull",
                Providers: service_provider
            })
        }
       
    })
})

module.exports = router;