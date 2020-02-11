const express = require('express');
const router = express.Router();
const Consumer = require('../model/Consumer');
const Service = require('../model/Categories');
const SubCategories = require('../model/Subcategory');
const SubCategoryChild = require('../model/SubCategoryChild');
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
    if (!req.body.category_image) {
        filename = '';
    }
    else {
        var base64Data = req.body.category_image.file;
        filename = 'prof_' + req.body.category + '.' + req.body.extension;
        fs.writeFile("./uploads/categories/" + filename, base64Data, 'base64', function (err) {
          if (err) console.log(err);
  
        });    
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


router.post('/delete-category', function(req,res){
    console.log(req.body);
    Service.findByPk(req.body.categoryid).then((appoint) => {
        appoint.destroy().then(function(appoint){
            res.json({value:1, message: 'Category Deleted Successfully' })
        })
        
    });
});


router.post('/edit-category', function(req,res){

    console.log(req.body);
    const values = {
        category: req.body.category,
        color_code: req.body.color_code,
      }
      const selector = {
        where: { id: req.body.categoryid },
      };
    
      Service.update(values, selector).then(service => {

        if (!service) {
            return res.status(400).send({
                value: 0,
                message: 'Something wrong'
              });
          }
          else{
            
            return res.status(200).send({
                value: 1,
                message: 'success'
              });
          }

      });
})

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
    SubCategories.belongsTo(Service, { foreignKey: 'category_id' });

    SubCategories.findAll({
        include: [
            {
                model: Service
            }
        ]
      }
    ).then(subcat=>{
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

router.post('/delete-subcategory', function(req,res){
    console.log(req.body);
    SubCategories.findByPk(req.body.subcategoryid).then((appoint) => {
        appoint.destroy().then(function(appoint){
            res.json({value:1, message: ' Sub Category Deleted Successfully' })
        })
        
    });
});

router.post('/edit-subcategory', function(req,res){

    console.log(req.body);
    const values = {
        category_id: req.body.category_id,
        subcategory: req.body.subcategory,
      }
      const selector = {
        where: { id: req.body.subcategoryid },
      };
    
      SubCategories.update(values, selector).then(service => {

        if (!service) {
            return res.status(400).send({
                value: 0,
                message: 'Something wrong'
              });
          }
          else{
            
            return res.status(200).send({
                value: 1,
                message: 'success'
              });
          }

      });
});

router.post('/add-finalsubcategory', function(req,res){
    console.log('hiii');
    console.log(req.body);
    const subcategory = new SubCategoryChild({
        subcategoryid: req.body.category_id,
        name: req.body.subcategory,
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

router.get('/list-finalsubcategory', function(req,res){
    SubCategoryChild.belongsTo(SubCategories, { foreignKey: 'subcategoryid' });
    SubCategoryChild.findAll({ include: [
        {
            model: SubCategories
        }
    ]}).then(subcat=>{
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

router.post('/delete-finalsubcategory', function(req,res){
    console.log(req.body);
    SubCategoryChild.findByPk(req.body.subcategoryid).then((appoint) => {
        appoint.destroy().then(function(appoint){
            res.json({value:1, message: ' Sub Category Deleted Successfully' })
        })
        
    });
});


router.post('/edit-finalsubcategory', function(req,res){

    console.log(req.body);
    const values = {
        subcategoryid: req.body.category,
        name: req.body.subcategory,
      }
      const selector = {
        where: { id: req.body.subcategoryid },
      };
    
      SubCategoryChild.update(values, selector).then(service => {

        if (!service) {
            return res.status(400).send({
                value: 0,
                message: 'Something wrong'
              });
          }
          else{
            
            return res.status(200).send({
                value: 1,
                message: 'success'
              });
          }

      });
});



module.exports = router;