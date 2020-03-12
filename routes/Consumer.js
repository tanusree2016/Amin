const express = require('express');
const router = express.Router();
const Consumer = require('../model/Consumer');
const Service = require('../model/Categories');
const SubCategories = require('../model/Subcategory');
const SubCategoriesChild = require('../model/SubCategoryChild');
const Provider = require('../model/Provider');
const Skills = require('../model/Skill');
const Feedback = require('../model/Feedback');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_config = require('../jwt.config');
const nodemailer = require('nodemailer');
const Timeslot = require('../model/TimeSlot');
const Booking = require('../model/Booking');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'tansree81@gmail.com', // generated ethereal user
        pass: '20114213ta' // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});


router.post('/social-login', function (req, res) {

    // console.log('--' + req.body);
    console.log('----' + JSON.stringify(req.body));
    if (!req.body.userId) {
        return res.status(400).send({
            value: 0,
            message: "Social id can not be empty"
        });
    }
    else {

        const Customer = new Consumer({
            name: req.body.name,
            email: req.body.email,
            social_image: req.body.avatar,
            social_id: req.body.userId
        });
        Customer.save().then(function (consumers) {

            const mailOptions = {
                from: 'tansree81@gmail.com', // sender address
                to: req.body.email,
                cc: 'tanusreekolkata2013@gmail.com', // cc
                subject: 'Registration Successfull', // Subject line
                html: 'Welcome to beeping.me. You are successfully registered.', // plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    //res.json('Some Error occured');
                } else {
                    console.log(info);
                    //res.json('Check your Mail');
                }
            })
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
    }
})

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

                        const mailOptions = {
                            from: 'tansree81@gmail.com', // sender address
                            to: req.body.email,
                            cc: 'tanusreekolkata2013@gmail.com', // cc
                            subject: 'Registration Successfull', // Subject line
                            html: 'Welcome to beeping.me. You are successfully registered.', // plain text body
                        };

                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                console.log(err);
                                //res.json('Some Error occured');
                            } else {
                                console.log(info);
                                //res.json('Check your Mail');
                            }
                        })
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

    // console.log('--'+req.body);

    console.log('--' + JSON.stringify(req.body));
    //res.status({data:req.body});
    if (!req.body.email) {
        return res.status(400).send({
            value: 0,
            message: "Email can not be empty"
        });
    }
    else {
        Consumer.findOne({ where: { email: req.body.email } }).then(function (consumers) {
            console.log('cons' + JSON.stringify(consumers));
            if (!consumers) {
                return res.status(200).send({
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

                        return res.status(200).send({
                            value: 2,
                            message: 'Incorrect Password'
                        });
                    }
                })
            }
        })
    }
});

router.post('/services', function (req, res) {
    Service.findAll().then(function (services) {
        if (!services) {
            res.status(400).send({
                value: 0,
                message: "No service found"
            });
        }
        else {
            res.status(200).send({
                value: 1,
                message: "Successfull",
                Service: services
            });
        }
    });
});



router.post('/service-provider-by-id', function (req, res) {
    Provider.hasMany(Skills, { sourceKey: 'id', foreignKey: 'service_provider_id' });
    //  Project.belongsTo(Client, {foreignKey: 'client_id'});

    Provider.findAll({
        // where: { service_id: req.body.service_id }
        include: [
            {
                model: Skills,
                where: { service_id: req.body.service_id }

            }
        ]
    }).then(providers => {
        if (!providers) {
            res.status(400).send({
                value: 0,
                message: "No service found"
            });
        }
        else {
            res.status(200).send({
                value: 1,
                Providers: providers
            })
        }
    });
});


router.post('/service-provider', function (req, res) {

    Provider.hasMany(Skills, { sourceKey: 'id', foreignKey: 'service_provider_id' });
    Provider.hasMany(Feedback, { sourceKey: 'id', foreignKey: 'service_provider_id' });

    Provider.findByPk(req.body.service_provider_id, {

        where: { service_provider_id: req.body.service_provider_id }
        // include: [
        //     {
        //         model: Skills,
        //         where: { service_provider_id: req.body.service_provider_id }
        //     },
        //     {
        //         model: Feedback,
        //         where: { service_provider_id: req.body.service_provider_id }
        //     }
        // ]
    }).then(service_provider => {
        //console.log('dd'+JSON.stringify(service_provider));
        // console.log(service_provider.sub_category);
        Service.findByPk(service_provider.service).then(category => {
            SubCategories.findByPk(service_provider.sub_category).then(subcategory => {

                SubCategoriesChild.findByPk(service_provider.final_category).then(subcatchild => {

                    service_provider.service = category.category;
                    service_provider.sub_category = subcategory.subcategory;
                    service_provider.final_category = subcatchild.name;

                    //    // console.log(service_provider);
                    if (!service_provider) {
                        res.status(400).send({
                            value: 0,
                            message: "Some error occured"
                        });
                    }
                    else {

                        res.json({
                            Providers: service_provider,
                            value: 1,
                            message: 'success'
                        });
                    }
                })
            })
        })
    })
});


router.post('/forget-password', function (req, res) {

    if (!req.body.email) {
        res.status(200).send({
            value: 0,
            message: "email required",

        });
    }
    else {
        Consumer.findOne({ where: { email: req.body.email } }).then(function (consumers) {

            if (!consumers) {
                res.status(400).send({
                    value: 0,
                    message: "Profile not exist"
                });
            }
            else {
                var password = '12345';
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        const values = {
                            password: hash,
                        };

                        const selector = {
                            where: { email: req.body.email },
                        };

                        Consumer.update(values, selector).then(consumer => {
                            if (!consumer) {
                                res.status(400).send({
                                    value: 0,
                                    message: "Some error occured"
                                });
                            }
                            else {


                                const mailOptions = {
                                    from: 'tansree81@gmail.com', // sender address
                                    to: req.body.email,
                                    cc: 'tanusreekolkata2013@gmail.com', // cc
                                    subject: 'Forget Password', // Subject line
                                    html: 'Your password reset successfully. Please login with you registered email and default password given for further enjoyment!!. You default pasword: ' + password, // plain text body
                                };

                                transporter.sendMail(mailOptions, function (err, info) {
                                    if (err) {
                                        console.log(err);
                                        //res.json('Some Error occured');
                                    } else {
                                        console.log(info);
                                        //res.json('Check your Mail');
                                    }
                                })
                                res.status(200).send({
                                    value: 1,
                                    message: "successfull",

                                });
                            }

                        });
                    });
                });
            }
        });
    }
});

router.post('/my-account', function (req, res) {
    Consumer.findByPk(req.body.consumerid).then(consumer => {

        var name = req.body.name != "" ? req.body.name : consumer.name;
        var address = req.body.address != "" ? req.body.address : consumer.address;
        var landmark = req.body.address != "" ? req.body.address : consumer.address;
        console.log('password----' + req.body.password);
        console.log('hi');
        if (typeof req.body.password !== 'undefined' && req.body.password != "") {

            console.log('hello');
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        const values = {
                            name: name,
                            address: address,
                            landmark: landmark,
                            password: hash,
                        };
                        const selector = {
                            where: { id: req.body.consumerid },
                        };
                        Consumer.update(values, selector).then(customer => {
                            if (!customer) {
                                return res.status(400).send({
                                    value: 0,
                                    message: 'Not saved error'
                                });
                            }
                            else {

                                return res.status(200).send({
                                    value: 1,
                                    message: 'Updated'
                                });
                            }
                        })
                    })

                }
            })


        }

        else {
            const values = {
                name: name,
                address: address,
                landmark: landmark,

            };
            const selector = {
                where: { id: req.body.consumerid },
            };
            Consumer.update(values, selector).then(customer => {
                if (!customer) {
                    return res.status(400).send({
                        value: 0,
                        message: 'Not saved error'
                    });
                }
                else {

                    return res.status(200).send({
                        value: 1,
                        message: 'Updated'
                    });
                }
            })



        }

    });






    // if (typeof req.body.password !== 'undefined') {
    //     bcrypt.genSalt(10, (err, salt) => {
    //         if (err) console.error('There was an error', err);
    //         else {
    //             bcrypt.hash(req.body.password, salt, (err, hash) => {
    //                 const values = {
    //                     password: hash,
    //                 };

    //                 const selector = {
    //                     where: { id: req.body.id },
    //                 };

    //             })
    //         }
    //     })
    // }
    // else {
    //     const values = {
    //         password: hash,
    //     };

    //     const selector = {
    //         where: { email: req.body.email },
    //     };


    // }


})



router.post('/time-slot', function (req, res) {
    Timeslot.findAll().then(time => {
        if (!time) {
            res.json({ value: 0, message: "Not found" });
        }
        else {

            res.json({ value: 1, message: "Success", Time: time });
        }
    })
});



router.post('/booking', function (req, res) {
    // if(typeof req.body.timeslot_id !== 'undefined'){
    //     var time_slot = 
    //     var 
    // }
    // else{

    // }


    const booking = new Booking({
        amount: req.body.amount,
        payment_id: req.body.payment_id,
        timeslot_id: req.body.timeslot_id,
        custom_time: req.body.custom_time,
        user_id: req.body.user_id,
        provider_id: req.body.provider_id,
        booking_date: req.body.booking_date,
        address: req.body.address
    });

    booking.save().then(books => {
        if (!books) {
            res.json({ value: 0, message: "Not saved" });
        }
        else {
            res.json({ value: 1, message: "Successfull", Bookings: books });
        }
    })
});

router.post('/customer-booking-history', function (req, res) {

   
    Booking.belongsTo(Timeslot, { foreignKey: 'timeslot_id' });
    Booking.belongsTo(Provider, { foreignKey: 'provider_id' });
    Provider.belongsTo(Service, { foreignKey: 'service' });
    //  Provider.belongsTo(SubCategoriesChild, { foreignKey: 'sub_category' });
    Provider.belongsTo(SubCategories, { foreignKey: 'sub_category' });
    Booking.findAll({
        include: [
            {
                model: Timeslot
            },

            {
                model: Provider,
                include: [{ model: Service }, { model: SubCategories }]
            }
        ],

        where: { user_id: req.body.user_id }
    }).then(booking => {
       // console.log("====="+booking);
        var newarr = [];
        booking.forEach(element => {
            newarr.push({
                id: element.id,
                amount: element.amount,
                status: element.status,
                address: element.address,
                payment_id: element.status,
                timeslot_id: element.timeslot_id,
                custom_time: element.custom_time,
                user_id: element.user_id,
                booking_date: element.booking_date,
                provider_id: element.provider_id,
                createdAt: element.createdAt,
                updatedAt: element.updatedAt,
                provider_name: element.amin_service_provider.name,
                phone: element.amin_service_provider.phone,
                id_proof: element.amin_service_provider.id_proof,
                slot_from: element.amin_time_slot.slot_from,
                slot_to: element.amin_time_slot.slot_to,
                category: element.amin_service_provider.amin_service_category.category,
                subcategory: element.amin_service_provider.amin_service_subcategory.subcategory,

            }
            )
        });

        if (!booking) {
            res.json({ value: 0, message: "not found" });
        }
        else {
            res.json({ value: 1, message: "success", data: newarr });
        }

    })

})

//         })
//     })
// })

router.post('/customer-booking-recent', function (req, res) {
    const now = new Date();
    const today_date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    Booking.belongsTo(Timeslot, { foreignKey: 'timeslot_id' });
    Booking.belongsTo(Provider, { foreignKey: 'provider_id' });
    Provider.belongsTo(Service, { foreignKey: 'service' });
    //  Provider.belongsTo(SubCategoriesChild, { foreignKey: 'sub_category' });
    Provider.belongsTo(SubCategories, { foreignKey: 'sub_category' });
    Booking.findAll({
        include: [
            {
                model: Timeslot
            },

            {
                model: Provider,
                include: [{ model: Service }, { model: SubCategories }]
            }
        ],

        where: { user_id: req.body.user_id, booking_date: today_date }
    }).then(booking => {

        var newarr = [];
        booking.forEach(element => {
            newarr.push({
                id: element.id,
                amount: element.amount,
                status: element.status,
                address: element.address,
                payment_id: element.status,
                timeslot_id: element.timeslot_id,
                custom_time: element.custom_time,
                user_id: element.user_id,
                booking_date: element.booking_date,
                provider_id: element.provider_id,
                createdAt: element.createdAt,
                updatedAt: element.updatedAt,
                provider_name: element.amin_service_provider.name,
                phone: element.amin_service_provider.phone,
                id_proof: element.amin_service_provider.id_proof,
                slot_from: element.amin_time_slot.slot_from,
                slot_to: element.amin_time_slot.slot_to,
                category: element.amin_service_provider.amin_service_category.category,
                subcategory: element.amin_service_provider.amin_service_subcategory.subcategory,

            }
            )
        });

        if (!booking) {
            res.json({ value: 0, message: "not found" });
        }
        else {
            res.json({ value: 1, message: "success", data: newarr });
        }

    })
})


module.exports = router;