const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require("path");
var os = require("os");
var url = require("url");

const service = require('./routes/Service')
const consumer = require('./routes/Consumer');
const admin = require('./routes/Admin');


const teststudy = require('./routes/teststudy');

// ... other app.use middleware 
//app.use(express.static(path.join(__dirname, "client", "build")))

//Static file declaration
//app.use(express.static(path.join(__dirname, 'client/build')));

//production mode

//app.use(express.static(path.join(__dirname, 'client/build')));  
// app.get('*', (req, res) => {
//       res.sendfile(path.join(__dirname = 'client/build/index.html')); 
//     })

//build mode
//app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json());
app.use(cors());

app.use('/service',service);
app.use('/consumer',consumer);
app.use('/admin',admin);
app.use('/test',teststudy)
app.get('/', function(req, res) {
    res.send('hello');
});

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

//const PORT = process.env.PORT ||80;

//const PORT = 5000;

// app.listen(PORT, ('162.214.74.6') => {
  //    var hostname = os.networkInterfaces();
    //  console.log(hostname);
     // console.log(url.href );
    // console.log(`Server is running on PORT ${PORT}`);
// });

app.listen(5000, "192.168.1.132");

//start server
// app.listen(80, (req, res) => { 
 
//   })
