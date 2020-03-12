const express = require('express');
const router = express.Router();
var otpGenerator = require('otp-generator');
const UberUser = require('../model/UberUser');



router.post('/palindrome', function (req, res) {
    var str = "niftin"

    var len = str.length;
    var mid = Math.floor(len / 2);

    console.log(len);
    console.log(mid);

    for (var i = 0; i < mid; i++) {
        if (str[i] !== str[len - 1 - i]) {

            res.json({ value: false });
        }
    }

    res.json({ value: true });
})




router.post('/uber-login', function (req, res) {

    var otp = otpGenerator.generate(4, { upperCase: false, specialChars: false });

    const uber = new UberUser({
        phone: req.body.phone,
        otp: otp
    });

    uber.save().then(data => {
        if (!data) {
            res.json({ value: 0, message: "not saved" });
        }
        else {
            res.json({ value: 1, message: "successfull", datas: data });
        }
    })

});

router.post('/uber-profile', function (req, res) {
    const values = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,

    };

    const selector = {
        where: { id: req.body.loginid },
    };

    UberUser.update(values, selector).then(User => {

        UberUser.findByPk(req.body.loginid).then(details => {
            if (!UberUser) {
                res.json({ value: 0, message: "Not successfull" });
            }
            else {
                res.json({ value: 1, message: "successfull", data: details})
            }

        })
    })

});


router.post('/uber-verify-otp', function (req, res) {
    UberUser.findOne({ where: { otp: req.body.otp } }).then(user => {

        if (!user || user == '') {
            res.status(400).send({
                value: 0,
                message: "Some error occured"
            });
        }
        else {

            res.status(200).send({
                value: 1,
                message: "successfull",
                user: user
            })
        }
    })
});


module.exports = router;