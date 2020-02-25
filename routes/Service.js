const express = require('express');
const router = express.Router();
const Service = require('../model/Categories');
const SubCategories = require('../model/Subcategory');
const SubCategoriesChild = require('../model/SubCategoryChild');
const Provider = require('../model/Provider');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_config = require('../jwt.config');
const nodemailer = require('nodemailer');
const Nexmo = require('nexmo');
var otpGenerator = require('otp-generator');
var ProviderFiles = require('../model/ProviderFile');
const fs = require('fs');
var randomize = require('randomatic');
const Consumer = require('../model/Consumer');
const Sequelize = require('sequelize');

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
          var otp = otpGenerator.generate(4, { upperCase: false, specialChars: false });
          const Provid = new Provider({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            otp: otp,
          });

          Provid.save().then(function (providers) {



            const mailOptions = {
              from: 'tansree81@gmail.com', // sender address
              to: req.body.email,
              cc: 'tanusreekolkata2013@gmail.com', // cc
              subject: 'OTP', // Subject line
              html: 'Hello from beeping.me .Your OTP is:' + otp
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


            const nexmo = new Nexmo({
              apiKey: 'ad6511e7',
              apiSecret: 'Bk8CvNnFEntN3E8z',
            });
            const from = 'Beeping.me';
            const to = req.body.phone;
            const text = 'Hello from beeping.me.Your OTP is:' + otp;

              nexmo.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    console.log(err);
                } else {
                    if(responseData.messages[0]['status'] === "0") {
                        console.log("Message sent successfully.");
                    } else {
                        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    }
                }
            })

            if (!providers) {
              return res.status(400).send({
                value: 0,
                message: 'Not saved error'
              });
            }
            else {

              return res.status(200).send({
                value: 1,
                message: 'Succefully registered',
                data: providers
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


router.post('/verify-otp', function (req, res) {
  Provider.findAll({ where: { otp: req.body.otp } }).then(providers => {

    if (!providers || providers == '') {
      res.status(400).send({
        value: 0,
        message: "Some error occured"
      });
    }
    else {

      res.status(200).send({
        value: 1,
        message: "successfull",
        Provider: providers
      })
    }
  })
});

router.post('/sub-categories', function (req, res) {
  SubCategories.findAll({ where: { category_id: req.body.category_id } }).then(subcat => {
    if (!subcat) {
      res.status(400).send({
        value: 0,
        message: "Some error occured"
      });
    }
    else {
      res.status(200).send({
        value: 1,
        message: "successfull",
        subcategories: subcat
      })
    }
  });
});

router.post('/sub-categories-child', function (req, res) {
  SubCategoriesChild.findAll({ where: { subcategoryid: req.body.sub_category_id } }).then(subcat => {

    console.log(subcat);
    if (!subcat) {
      res.status(400).send({
        value: 0,
        message: "Some error occured"
      });
    }
    else {
      res.status(200).send({
        value: 1,
        message: "successfull",
        subcategories: subcat
      })
    }
  });
});


router.post('/full-registration', function (req, res) {

 //console.log(JSON.stringify(req.body));
  
  var file = req.body.file.split(',')[1];
  //res.json({'file':file});
   var type = req.body.file.split(';')[0].split('/')[1];
   if(type=='jpeg'){
     type= 'jpg';
   }
//   console.log('type'+type);
//  console.log('fffff'+file);

  let filename = '';
    if (req.body.file) {
      var base64Data = file;
      filename = 'doc'+ randomize('A', 3) + req.body.name + '.' + type;
      fs.writeFile("./uploads/docs/" + filename, base64Data, 'base64', function (err) {
        if (err) console.log(err);

      });

    }
    else {
      filename = '';
    }


     //console.log('---files'+filename)
  const values = {
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    postal_code: req.body.postal_code,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    id_proof: req.body.id_proof,
    service: req.body.service,
    sub_category: req.body.sub_category,
    final_category: req.body.final_category,
    experience_yr: req.body.experience_yr,
    salary_hr: req.body.salary_hr,
    country: req.body.country
  }
  const selector = {
    where: { id: req.body.id },
  };

  Provider.update(values, selector).then(providers => {
    if (!providers) {
      res.status(400).send({
        value: 0,
        message: "Some error occured"
      });
    }
    else {

      const provider_files = new ProviderFiles({
        provider_id: req.body.id,
        filename: filename
      });

      provider_files.save();
      res.status(200).send({
        value: 1,
        message: "successfull",

      })
    }

  });
});


router.post('/accept-provider', function (req, res) {
  var password = '12345';
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const values = {
        is_verified: 'verified',
        password: hash,
      };

      const selector = {
        where: { id: req.body.providerid },
      };

      Provider.update(values, selector).then(providers => {
        if (!providers) {
          res.status(400).send({
            value: 0,
            message: "Some error occured"
          });
        }
        else {

          Provider.findByPk(req.body.providerid).then((appoint) => {

          const mailOptions = {
            from: 'tansree81@gmail.com', // sender address
            to: appoint.email,
            cc: 'tanusreekolkata2013@gmail.com', // cc
            subject: 'Account accepted successfully!!', // Subject line
            html: 'Your account accepted successfully. Please login with you registered email and default password given for further enjoyment!!. You default pasword: ' + password, // plain text body
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
        });
        }

      });
    });
  });
});


router.post('/reject-provider', function(req,res){
  const values = {
    is_verified: 'rejected',
  };

  const selector = {
    where: { id: req.body.providerid },
  };

  Provider.update(values, selector).then(providers => {
    if (!providers) {
      res.status(400).send({
        value: 0,
        message: "Some error occured"
      });
    }
    else{
      res.status(200).send({
        value: 1,
        message: "successfull",

      });
    }
  });

})

router.post('/is_exits', function (req, res) {
  if (!req.body.email) {
    return res.status(400).send({
      value: 0,
      message: "Email can not be empty"
    });
  }
  else {
    Provider.findOne({ where: { email: req.body.email } }).then(function (providers) {
      Consumer.findOne({ where: { email: req.body.email } }).then(function (consume) {
      
      if (!providers && !consume) {
        return res.status(200).send({
          value: 1,
          message: 'success'
        });
      }
      else{
        return res.status(400).send({
          value: 0,
          message: 'Email id already exits'
        });
      }

    })
  })
  }
})

router.post('/login', function (req, res) {
  console.log('--'+req.body.email);
  if (!req.body.email) {
    return res.status(400).send({
      value: 0,
      message: "Email can not be empty"
    });
  }
  else {
    Provider.findOne({ where: { email: req.body.email } }).then(function (providers) {
      console.log('providers'+JSON.stringify(providers))
      if (!providers) {
        return res.status(400).send({
          value: 2,
          message: 'Email id not exits. Please Register.'
        });
      }
      else {

        if (providers.is_verified == 'verified') {
          bcrypt.compare(req.body.password, providers.password).then((isMatch) => {
            if (isMatch) {
              const payload = {
                id: providers.id,
                name: providers.email,

              };

              jwt.sign(payload, jwt_config.secret, {
                expiresIn: 3600,
              }, (err, token) => {
                if (err) console.error('There is some error in token', err);
                else {
                  return res.status(200).send({
                    value: 1,
                    message: 'Succefully login',
                    data: providers,
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
        else {
          return res.status(400).send({
            value: 0,
            message: 'Your account is not verified yet. Please check later'
          });
        }
      }
    })
  }

});

router.post('/provider-list', function (req, res) {
  Provider.findAll().then(list => {
    if (!list) {
      res.status(400).send({
        value: 0,
        message: "Some error occured"
      });
    }
    else {
      res.status(200).send({
        value: 1,
        message: "successfull",
        Providers: list
      })
    }
  })
})


router.get('/accepted-provider-list', function (req, res) {
  Provider.findAll({where: {is_verified:'verified'}}).then(list => {
    if (!list) {
      res.status(400).send({
        value: 0,
        message: "Some error occured"
      });
    }
    else {
      res.status(200).send({
        value: 1,
        message: "successfull",
        Providers: list
      })
    }
  })
});

router.post('/service-provider-by-category', function(req,res){
  Provider.findAll({where: {final_category: req.body.childcategory, online_offline: 1}}).then(list => {
    if(!list){
      res.status(400).send({
        value: 0,
        message: "Some error occured"
      });
    }
    else{
      res.status(200).send({
        value: 1,
        message: "successfull",
        Providers: list
      })
    }
  });
});

router.post('/search', function(req,res){
  const Op = Sequelize.Op;
  SubCategoriesChild.findAll({ where: { name: { [Op.like]: '%'+req.body.searchString+'%' } } }).then(subcatchild=> {

    console.log('---'+subcatchild);
    if(!subcatchild){
      res.json({
        value:0,
        message:"not found"
      })
    }
    else{
      res.json({value:1, message:"successfull", result:subcatchild});
    }
  })
})

module.exports = router;
