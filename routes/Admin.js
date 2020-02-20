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
const MasterLocation = require('../model/MasterLocation');
const Country = require('../model/Country');
const State = require('../model/State');
const Sequelize = require('sequelize');
const db = require('../db');


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


router.post('/list-subcategory', function (req, res) {
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

router.post('/list-finalsubcategory', function(req,res){
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


router.post('/master-location', function(req,res){
    const location = new MasterLocation({
        country_id: req.body.country_id,
        state_id: req.body.state_id,
        city: req.body.city
    });

    location.save().then(loc=>{
        if(!loc){
            return res.status(400).send({
                value: 0,
                message: 'Not saved error'
            });
        }   
        else{
            return res.status(200).send({
                value: 1,
                message: 'Succefully added location',
                data: loc
            });
        }
    })
});

router.post('/country-list', function(req,res){
    Country.findAll().then(country=>{
        if(!country){
            return res.status(400).send({
                value:0,
                message: 'Error'
            });
        }
        else{
            return res.status(200).send({
                value: 1,
                message: 'success',
                data: country
            })
        }
    })
});


router.post('/state-list/:country_id', function(req,res){
    State.findAll({where:{country_id:req.params.country_id}}).then(country=>{
        if(!country){
            return res.status(400).send({
                value:0,
                message: 'Error'
            });
        }
        else{
            return res.status(200).send({
                value: 1,
                message: 'success',
                data: country
            })
        }
    })
});


router.post('/master-country-list', function(req,res){

    // const country =  db.sequelize.query('SELECT name FROM countries INNER JOIN master_locations ON countries.id=master_locations.country_id GROUP BY name');
    //     res.json({'country': country});
     MasterLocation.belongsTo(Country, { foreignKey: 'country_id' });

   // MasterLocation.hasOne(Country, { foreignKey: 'id' });

    MasterLocation.findAll({
        include: //[
            {
                model: Country,
                required: true
               // attributes: ['name'],
               // required: false,
            },
       // ],
        // hierarchy: true,
         group: ['country_id'],
         attributes: ['country.name'],
    }
    ).then(location=>{
        
        var newarr = []
        location.forEach(element => {
            console.log('ele'+JSON.stringify(element.country.name));
            //console.log('loc'+JSON.stringify(location.country_id[element]));
            newarr.push({
                name: element.country.name,
                id: element.country.id
            }
            )

            //console.log(newarr);
        });

      //location.pop("country")
        if(!location){
            return res.status(400).send({
                value:0,
                message: 'Error'
            });
        }
        else{
          return res.status(200).send({
                value: 1,
                message: 'success',
                data: newarr
            })
        }
    })

});


router.post('/master-state-list', function(req,res){
    MasterLocation.belongsTo(State, { foreignKey: 'state_id' });
    MasterLocation.findAll({
        where: {country_id: req.body.country_id},
        include: [
            {
                model: State
            }
        ],
       group: ['state_id'],
    //  distinct: true,
       where: {country_id: req.body.country_id},
    }
    ).then(state=>{

        var newarr = []
        state.forEach(element => {
            console.log('ele'+JSON.stringify(element.state.name));
            //console.log('loc'+JSON.stringify(location.country_id[element]));
            newarr.push({
                name: element.state.name,
                id: element.state.id
            }
            )

            //console.log(newarr);
        });

        if(!state){
            return res.status(400).send({
                value:0,
                message: 'Error'
            });
        }
        else{
          return res.status(200).send({
                value: 1,
                message: 'success',
                data: newarr
            })
        }
    })
});

router.post('/master-city-list', function(req,res){
    MasterLocation.findAll({
       where: {country_id: req.body.country_id, state_id : req.body.state_id},
    }
    ).then(city=>{
        if(!city){
            return res.status(400).send({
                value:0,
                message: 'Error'
            });
        }
        else{
          return res.status(200).send({
                value: 1,
                message: 'success',
                data: city
            })
        }
    })
});

router.post('/location-list', function(req,res){
    MasterLocation.belongsTo(State, { foreignKey: 'state_id' });
    MasterLocation.belongsTo(Country, { foreignKey: 'country_id' });

    MasterLocation.findAll({
        include: [
            {
               
                model: Country
            },
            {
               
                model: State
            }
        ],
       group: ['city'],

    }
    ).then(location=>{
        if(!location){
            return res.status(400).send({
                value:0,
                message: 'Error'
            });
        }
        else{
          return res.status(200).send({
                value: 1,
                message: 'success',
                data: location
            })
        }

    })
});

router.post('/delete-location', function(req, res){
    
    MasterLocation.findByPk(req.body.locationid).then((appoint) => {
        appoint.destroy().then(function(appoint){
            res.json({value:1, message: 'Location Deleted Successfully' })
        })
        
    });
});

router.post('/edit-location' , function(req,res){
    const values = {
        country_id: req.body.country_id,
        state_id: req.body.state_id,
        city: req.body.city
      }
      const selector = {
        where: { id: req.body.locationid },
      };
    
      MasterLocation.update(values, selector).then(location => {

        if (!location) {
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






module.exports = router;