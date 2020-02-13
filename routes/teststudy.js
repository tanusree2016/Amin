const express = require('express');
const router = express.Router();


router.post('/palindrome', function (req, res) {
    var str = "niftin"

    var len = str.length;
    var mid = Math.floor(len/2);

    console.log(len);
    console.log(mid);

    for ( var i = 0; i < mid; i++ ) {
        if (str[i] !== str[len - 1 - i]) {
              
            res.json({value: false});
        }
    }

     res.json({value: true});
})

module.exports = router;