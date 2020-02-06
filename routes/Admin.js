const express = require('express');
const router = express.Router();
const Consumer = require('../model/Consumer');
const Service = require('../model/Categories');
const SubCategories = require('../model/Subcategory');
const Admin = require('../model/Admin');
const Provider = require('../model/Provider');
const Skills = require('../model/Skill');
const Feedback = require('../model/Feedback'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_config = require('../jwt.config');
const fs = require('fs');

router.post('/login', function (req, res) {
    if (!req.body.email) {
        return res.status(400).send({
            value: 0,
            message: "Email can not be empty"
        });
    }
    else {
        Admin.findOne({ email: req.body.email }).then(function (admins) {
            
            if (!admins) {
                return res.status(400).send({
                    value: 0,
                    message: 'Email id not exits. Please Register.'
                });
            }
            else {
                bcrypt.compare(req.body.password, admins.password).then((isMatch) => {
                    if (isMatch) {
                        const payload = {
                            id: admins.id,
                            name: admins.email,

                        };

                        jwt.sign(payload, jwt_config.secret, {
                            expiresIn: 3600,
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                return res.status(200).send({
                                    value: 1,
                                    message: 'Succefully login',
                                    data: admins,
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


router.post('/add-category', function (req, res) {
    console.log(JSON.stringify(req.body));

    let filename = '';
    if (req.body.category_image.file) {
      var base64Data = req.body.category_image.file;
      filename = 'prof_' + req.body.category + '.' + req.body.extension;
      fs.writeFile("./uploads/categories/" + filename, base64Data, 'base64', function (err) {
        if (err) console.log(err);

      });

    }
    else {
      filename = '';
    }

    const category = new Service({
        category: req.body.category,
        category_image: filename,
        color_code: req.body.color_code,
    });
    category.save().then(categories=>{
        if(!category){
            return res.status(400).send({
                value: 0,
                message: 'Not saved error'
            });
        }
        else{
            return res.status(200).send({
                value: 1,
                message: 'Succefully added category',
                data: categories
            });
        }
    })
});

router.post('/add-subcategory', function (req, res) {
    console.log(JSON.stringify(req.body));


    const subcategory = new SubCategories({
        category_id: req.body.category_id,
        subcategory: req.body.subcategory,
    });
    subcategory.save().then(subcategories=>{
        if(!subcategories){
            return res.status(400).send({
                value: 0,
                message: 'Not saved error'
            });
        }
        else{
            return res.status(200).send({
                value: 1,
                message: 'Succefully added subcategory',
                data: subcategories
            });
        }
    })
});


router.get('/list-subcategory', function (req, res) {
    SubCategories.findAll().then(subcat=>{
        if(!subcat){
            return res.status(400).send({
                value: 0,
                message: 'error'
            });
        }
        else{
            return res.status(200).send({
                value: 1,
                message: 'Succesfull',
                Service: subcat
            });
        }
    })
});




module.exports = router;