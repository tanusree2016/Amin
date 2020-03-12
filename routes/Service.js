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
const Op = Sequelize.Op;
const Booking = require('../model/Booking');
const Timeslot = require('../model/TimeSlot');
const BankDetails = require('../model/BankDetails');

var moment = require('moment');

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
                if (responseData.messages[0]['status'] === "0") {
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
  if (type == 'jpeg') {
    type = 'jpg';
  }
  //   console.log('type'+type);
  //  console.log('fffff'+file);

  let filename = '';
  if (req.body.file) {
    var base64Data = file;
    filename = 'doc' + randomize('A', 3) + req.body.name + '.' + type;
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
    experience: req.body.experience_yr,
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
        filename: req.body.file
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


router.post('/reject-provider', function (req, res) {
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
    else {
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
        else {
          return res.status(200).send({
            value: 0,
            message: 'Email id already exits'
          });
        }

      })
    })
  }
})

router.post('/login', function (req, res) {
  console.log('--' + req.body.email);
  if (!req.body.email) {
    return res.status(400).send({
      value: 0,
      message: "Email can not be empty"
    });
  }
  else {
    Provider.findOne({ where: { email: req.body.email } }).then(function (providers) {
      console.log('providers' + JSON.stringify(providers))
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
  Provider.findAll({ where: { is_deleted: 0 } }).then(list => {
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
  Provider.findAll({ where: { is_verified: 'verified' } }).then(list => {
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

router.post('/service-provider-by-category', function (req, res) {
  Provider.findAll({ where: { final_category: req.body.childcategory, online_offline: 1 } }).then(list => {
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
  });
});

router.post('/search', function (req, res) {
  const Op = Sequelize.Op;
  SubCategoriesChild.findAll({ where: { name: { [Op.like]: '%' + req.body.searchString + '%' } } }).then(subcatchild => {

    console.log('---' + subcatchild);
    if (!subcatchild) {
      res.json({
        value: 0,
        message: "not found"
      })
    }
    else {
      res.json({ value: 1, message: "successfull", result: subcatchild });
    }
  })
});


router.post('/on-off', function (req, res) {
  console.log(req.body);
  console.log('helo00000000000');
  const values = {
    online_offline: req.body.on_off
  }
  const selector = {
    where: { id: req.body.id },
  };

  Provider.update(values, selector).then(providers => {

    Provider.findByPk(req.body.id).then(details => {

      console.log('---' + providers);

      if (!providers) {
        res.json({
          value: 0,
          message: "not found"
        })
      }
      else {
        res.json({ value: 1, message: "successfull", status: details.online_offline });

      }
    });
  });
});

router.post('/service-provider-list', function (req, res) {

  Booking.findAll({ where: { timeslot_id: req.body.timeslot_id, booking_date: req.body.booking_date, } }).then(bookings => {
    //console.log('bookings'+JSON.stringify(bookings));
    let provider_array = [];
    bookings.forEach(element => {

      provider_array.push(element.provider_id);
    });

    //console.log('outside'+provider_array);

    if (provider_array == '') {
      res.json({ value: 0, message: "NOt found" });
    }
    else {
      // console.log('not null');

      Provider.findAll({
        where: {
          id: {
            [Op.not]: provider_array
          },
          is_verified: 'verified'
        }
      }).then(providers => {

        if (!providers) {
          res.json({ value: 0, message: "NOt found" });
        }
        else {
          res.json({ value: 1, Providers: providers, message: "Success" });
        }
      })
    }

  })

});

router.post('/booking-accept', function (req, res) {

  let acceptance_status = '';
  let provider = '';
  let provider_ids = ''
  Provider.findOne({ where: { id: { [Op.not]: req.body.login_id }, salary_hr: req.body.rate } }).then(nextprovider => {
    console.log('====' + JSON.stringify(nextprovider));
    if (nextprovider !== null) {
      if (req.body.accept_reject == 2) {
        acceptance_status = 'Accept';
        provider = '';
        provider_ids = req.body.login_id;
      }
      else if (req.body.accept_reject == 3) {
        acceptance_status = 'Reject';
        provider = nextprovider;
        provider_ids = nextprovider.id;
      }
      else {
        acceptance_status = '';
        provider = '';
      }

      const values = {
        status: req.body.accept_reject,
        provider_id: provider_ids

      };

      const selector = {
        where: { id: req.body.bookingid },
      };

      Booking.update(values, selector).then(bookings => {
        if (!bookings) {
          res.json({ value: 0, message: "Not updated" });
        }
        else {
          res.json({ value: 1, message: "Success", status: acceptance_status, Provider: provider });
        }
      })
    }
    else {

      res.json({ value: 0, message: "Not Found that salary ranges" });
    }
  })

});


router.post('/popup-data', function (req, res) {
  Booking.belongsTo(Consumer, { foreignKey: 'user_id' });
  Booking.belongsTo(Timeslot, { foreignKey: 'timeslot_id' });
  Booking.findOne({
    include: [
      {
        model: Consumer
      },
      {
        model: Timeslot
      }

    ],
    where: { provider_id: req.body.provider_id, status: 1 }
  }).then(data => {
    if (!data) {
      res.json({ value: 0, message: "no data" });
    }
    else {
      res.json({ value: 1, Data: data, message: " success" });
    }
  })

})

router.post('/cron-booking-reject', function (req, res) {

  Booking.findAll({ where: { status: 1 } }).then(cronjob => {

    runcron();
    async function runcron() {
      console.log('---' + cronjob.length);
      for (let i = 0; i < cronjob.length; i++) {

        newarr = [];
        console.log(cronjob[i].provider_id);
        await Provider.findOne({ where: { [Op.not]: cronjob[i].provider_id, salary_hr: req.body.rate } }).then(nextprovider => {

          console.log(nextprovider);

          newarr.push(nextprovider);
        });
        console.log(newarr);
      }
    }

  })

  // const now = new Date();

  // console.log(now.getHours());

  //  const today_time = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  // // const limit_time = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + (now.getMinutes() + 15) + ':' + now.getSeconds();
  // // console.log(today_time+''+limit_time);

  // Booking.findAll({where: {
  //   createdAt: {
  //     $lte: today_time
  //   }
  // }}).then(aa=>{

  //   console.log('aaa'+aa);
  // })

})



router.post('/booking-list', function (req, res) {
  const now = new Date();
  //console.log(now.getMonth());
  const today_date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

  Booking.belongsTo(Consumer, { foreignKey: 'user_id' });
  Booking.belongsTo(Timeslot, { foreignKey: 'timeslot_id' });
  console.log(today_date);
  Booking.findAll({
    include: [
      {
        model: Consumer
      },
      {
        model: Timeslot
      }

    ],
    where: { provider_id: req.body.provider_id, status: 2, booking_date: today_date }
  }).then(booking => {

    var newarr = []
    booking.forEach(element => {
      console.log('ele' + JSON.stringify(element));
      //console.log('loc'+JSON.stringify(location.country_id[element]));
      newarr.push({
        id: element.id,
        amount: element.amount,
        status: element.status,
        address: element.address,
        payment_id: element.status,
        timeslot_id: element.timeslot_id,
        custom_time: element.custom_time,
        user_id: element.user_id,
        provider_id: element.provider_id,
        createdAt: element.createdAt,
        updatedAt: element.updatedAt,
        consumer_name: element.amin_consumer.name,
        social_image: element.amin_consumer.social_image,
        phone: element.amin_consumer.phone,
        slot_from: element.amin_time_slot.slot_from,
        slot_to: element.amin_time_slot.slot_to,

      }
      )

      //console.log(newarr);
    });


    if (!booking) {
      res.json({ value: 0, message: "NOt Found" });
    }

    else {
      res.json({ value: 1, message: "Success", Booking: newarr })
    }


  })
});



router.post('/history-booking-list', function (req, res) {
  const now = new Date();
  const today_date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  Booking.belongsTo(Consumer, { foreignKey: 'user_id' });
  Booking.belongsTo(Timeslot, { foreignKey: 'timeslot_id' });
  Booking.findAll({
    include: [
      {
        model: Consumer
      },
      {
        model: Timeslot
      }

    ],
    where: { provider_id: req.body.provider_id, status: 2, service_status: 1 }
  }).then(booking => {
    console.log('===' + booking);
    var newarr = []
    booking.forEach(element => {

      //console.log('loc'+JSON.stringify(location.country_id[element]));
      newarr.push({
        id: element.id,
        amount: element.amount,
        status: element.status,
        address: element.address,
        payment_id: element.status,
        timeslot_id: element.timeslot_id,
        custom_time: element.custom_time,
        booking_date: element.booking_date,
        user_id: element.user_id,
        provider_id: element.provider_id,
        createdAt: element.createdAt,
        updatedAt: element.updatedAt,
        phone: element.amin_consumer.phone,
        consumer_name: element.amin_consumer.name,
        social_image: element.amin_consumer.social_image,
        slot_from: element.amin_time_slot.slot_from,
        slot_to: element.amin_time_slot.slot_to,
        service_status: element.service_status,

      }
      )

    });


    if (!booking) {
      res.json({ value: 0, message: "NOt Found" });
    }

    else {
      res.json({ value: 1, message: "Success", Booking: newarr })
    }


  })
});


router.post('/tommorow-booking-list', function (req, res) {

  const today = new Date()
  const tomorrow = new Date(today)

  const tommorow_date = tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + (tomorrow.getDate() + 1);
  //tomorrow.setDate(tomorrow.getDate() + 1)

  //console.log('---'+tommorow_date);

  //const now = new Date();
  // const today_date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  Booking.belongsTo(Consumer, { foreignKey: 'user_id' });
  Booking.belongsTo(Timeslot, { foreignKey: 'timeslot_id' });
  Booking.findAll({
    include: [
      {
        model: Consumer
      },
      {
        model: Timeslot
      }

    ],
    where: { provider_id: req.body.provider_id, status: 2, booking_date: tommorow_date }
  }).then(booking => {
    console.log('===' + booking);
    var newarr = []
    booking.forEach(element => {

      //console.log('loc'+JSON.stringify(location.country_id[element]));
      newarr.push({
        id: element.id,
        amount: element.amount,
        status: element.status,
        address: element.address,
        payment_id: element.status,
        timeslot_id: element.timeslot_id,
        custom_time: element.custom_time,
        booking_date: element.booking_date,
        user_id: element.user_id,
        provider_id: element.provider_id,
        createdAt: element.createdAt,
        updatedAt: element.updatedAt,
        consumer_name: element.amin_consumer.name,
        phone: element.amin_consumer.phone,
        social_image: element.amin_consumer.social_image,
        slot_from: element.amin_time_slot.slot_from,
        slot_to: element.amin_time_slot.slot_to,
        service_status: element.service_status,

      }
      )

    });


    if (!booking) {
      res.json({ value: 0, message: "NOt Found" });
    }

    else {
      res.json({ value: 1, message: "Success", Booking: newarr })
    }


  })

});


router.post('/weekly-booking-list', function (req, res) {

  var today = new Date();
  var week_start = startOfWeek(today).toISOString().split("T")[0];
  var week_end = endOfWeek(today).toISOString().split("T")[0];

  //console.log(week_start+'_'+week_end);

  // console.log(startOfWeek(today).toISOString().split("T")[0]);
  // const today_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  // today.setDate(today.getDate() + 7)
  // const week_date = today.toISOString().split("T")[0];


  Booking.belongsTo(Consumer, { foreignKey: 'user_id' });
  Booking.belongsTo(Timeslot, { foreignKey: 'timeslot_id' });
  Booking.findAll({
    include: [
      {
        model: Consumer
      },
      {
        model: Timeslot
      }

    ],
    where: { provider_id: req.body.provider_id, status: 2, booking_date: { [Op.lt]: week_end, [Op.gt]: week_start } }
  }).then(booking => {
    console.log('===' + booking);
    var newarr = []
    booking.forEach(element => {

      //console.log('loc'+JSON.stringify(location.country_id[element]));
      newarr.push({
        id: element.id,
        amount: element.amount,
        status: element.status,
        address: element.address,
        payment_id: element.status,
        timeslot_id: element.timeslot_id,
        custom_time: element.custom_time,
        booking_date: element.booking_date,
        user_id: element.user_id,
        provider_id: element.provider_id,
        createdAt: element.createdAt,
        updatedAt: element.updatedAt,
        consumer_name: element.amin_consumer.name,
        phone: element.amin_consumer.phone,
        social_image: element.amin_consumer.social_image,
        slot_from: element.amin_time_slot.slot_from,
        slot_to: element.amin_time_slot.slot_to,
        service_status: element.service_status,

      }
      )

    });


    if (!booking) {
      res.json({ value: 0, message: "NOt Found" });
    }

    else {
      res.json({ value: 1, message: "Success", Booking: newarr })
    }


  })
})


function startOfWeek(date) {
  var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  return new Date(date.setDate(diff));

}

function endOfWeek(date) {

  var lastday = date.getDate() - (date.getDay() - 1) + 6;
  return new Date(date.setDate(lastday));

}

router.post('/bank-details', function (req, res) {
  const bankdetails = new BankDetails({
    provider_id: req.body.provider_id,
    account_holder_name: req.body.account_holder_name,
    account_number: req.body.account_number,
    bank_name: req.body.bank_name,
    swift_code: req.body.swift_code,
    ifsc_code: req.body.ifsc_code
  });
  bankdetails.save().then(bankdet => {
    if (!bankdet) {
      res.json({ value: 0, message: "Not Found" });
    }
    else {
      res.json({ value: 1, message: "Successfull", data: bankdet });
    }
  })
});

router.post('/about-me', function (req, res) {
  const values = {
    about: req.body.about,

  }
  const selector = {
    where: { id: req.body.providerid },
  };

  Provider.update(values, selector).then(providers => {
    if (!providers) {
      res.json({ value: 0, message: "not updated" });
    }
    else {
      res.json({ value: 1, message: "provider updated successfully" });
    }
  })
});


router.post('/provider-image-upload', function (req, res) {
  //  var file = req.body.file.split(',')[1];
  //  var type = req.body.file.split(';')[0].split('/')[1];
  //  if (type == 'jpeg') {
  //    type = 'jpg';
  //  }

  //  let filename = '';
  //  if (req.body.file) {
  //    var base64Data = file;
  //    filename = 'prof' + randomize('A', 3) + req.body.name + '.' + type;
  //    fs.writeFile("./uploads/providerimage/" + filename, base64Data, 'base64', function (err) {
  //      if (err) console.log(err);

  //    });

  //  }
  //  else {
  //    filename = '';
  //  }

  const values = {
    id_proof: req.body.file,

  }
  const selector = {
    where: { id: req.body.providerid },
  };

  Provider.update(values, selector).then(providers => {
    Provider.findByPk(req.body.providerid).then(datas => {


      if (!providers) {
        res.json({ value: 0, message: "not updated" });
      }
      else {
        res.json({ value: 1, message: "provider pic updated successfully", data: datas });
      }
    })
  })

});

router.post('/provider-doc-upload', function (req, res) {
  // var file = req.body.file.split(',')[1];
  // //res.json({'file':file});
  // var type = req.body.file.split(';')[0].split('/')[1];
  // if (type == 'jpeg') {
  //   type = 'jpg';
  // }


  // let filename = '';
  // if (req.body.file) {
  //   var base64Data = file;
  //   filename = 'doc' + randomize('A', 3) + req.body.name + '.' + type;
  //   fs.writeFile("./uploads/docs/" + filename, base64Data, 'base64', function (err) {
  //     if (err) console.log(err);

  //   });

  // }
  // else {
  //   filename = '';
  // }


  const provider_files = new ProviderFiles({
    provider_id: req.body.provider_id,
    filename: req.body.file
  });

  provider_files.save().then(filess => {
    if (!filess) {
      res.json({ value: 0, message: "Not saved" });
    }
    else {
      res.json({ value: 1, message: "successfull", data: filess });
    }
  })
});


router.post('/service-forget-password', function (req, res) {
  if (!req.body.old_password) {

    res.json({ value: 0, message: "old password required" })
  }
  else {
    Provider.findByPk(req.body.providerid).then( prov => {

    //  console.log('==='+JSON.stringify(prov.password));
   // bcrypt.compare(req.body.oldpassword, prov.password).then((isMatch) => {
      bcrypt.compare(req.body.old_password, prov.password).then((isMatch) => {

      //console.log('==='+isMatch);
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
            const values = {
              password: hash,

            }
            const selector = {
              where: { id: req.body.providerid },
            };

            Provider.update(values, selector).then(providers => {
              if(!providers){
                res.json({value:3, message: "not updated" });
              }
              else{
                res.json({value:1, message: "password updated" });
              }
            });

          })
        })
        
      }

      else {
        res.json({ value: 2, message: "Old password not matched" })
      }
    })
  })
  }
  

})


module.exports = router;
