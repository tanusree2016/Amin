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
var otpGenerator = require('otp-generator')

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'tansree81@gmail.com', // generated ethereal user
      pass: '' // generated ethereal password
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
else{
  bcrypt.genSalt(10, (err, salt) => {
    if (err) console.error('There was an error', err);
    else {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
           var otp=  otpGenerator.generate(4, { upperCase: false, specialChars: false });
            const Provid = new Provider({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                otp: otp,
            });

            Provid.save().then(function (providers) {
             
            
              const nexmo = new Nexmo({
                apiKey: 'ad6511e7',
                apiSecret: 'Bk8CvNnFEntN3E8z',
              });
              const from = 'Amin VVS';
              const to = req.body.phone;
              const text = 'Hello from Amin.Your OTP is:'+otp;
  
            //   nexmo.message.sendSms(from, to, text, (err, responseData) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         if(responseData.messages[0]['status'] === "0") {
            //             console.log("Message sent successfully.");
            //         } else {
            //             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            //         }
            //     }
            // })

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

router.post('/verify-otp', function(req,res){
   Provider.findAll({where:{otp:req.body.otp}}).then(providers=>{
   
    if(!providers || providers==''){
      res.status(400).send({
        value: 0,
        message: "Some error occured"
      });
    }
    else{
      
        res.status(200).send({
          value:1,
          message: "successfull",
          Provider: providers
      })
    }
  })
});

router.post('/sub-categories', function(req,res){
  SubCategories.findAll({where:{category_id:req.body.category_id}}).then(subcat=>{
      if(!subcat){
        res.status(400).send({
          value: 0,
          message: "Some error occured"
      });
    }
    else{
      res.status(200).send({
        value:1,
        message: "successfull",
        subcategories: subcat
    })
    }
  });
});

router.post('/sub-categories-child', function(req,res){
  SubCategoriesChild.findAll({where:{subcategoryid:req.body.sub_category_id}}).then(subcat=>{
    
    console.log(subcat);
    if(!subcat){
      res.status(400).send({
        value: 0,
        message: "Some error occured"
    });
    }
    else{
      res.status(200).send({
        value:1,
        message: "successfull",
        subcategories: subcat
    })
    }
  });
});


router.post('/full-registration', function(req,res){

  // let filename = '';
  //   if (req.body.category_image.file) {
  //     var base64Data = req.body.category_image.file;
  //     filename = 'prof_' + req.body.category + '.' + req.body.extension;
  //     fs.writeFile("./uploads/categories/" + filename, base64Data, 'base64', function (err) {
  //       if (err) console.log(err);

  //     });

  //   }
  //   else {
  //     filename = '';
  //   }

  const values = {
    name : req.body.name,
    city : req.body.city,
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
    salary_hr: req.body.salary_hr
  }
const selector = {
    where: {id: req.body.id},
  };

  Provider.update(values, selector).then(providers=> {
    if(!providers){
        res.status(400).send({
          value: 0,
          message: "Some error occured"
      });
    }
    else{
      res.status(200).send({
        value:1,
        message: "successfull",
        
    })
    }
    
  });
})

router.post('/login', function (req, res) {


});

router.post('/provider-list', function (req,res){
  Provider.findAll().then(list => {
    if(!list){
      res.status(400).send({
        value: 0,
        message: "Some error occured"
    });
    }
    else{
      res.status(200).send({
        value:1,
        message: "successfull",
        Providers: list
    })
    }
  })
})

module.exports = router;
