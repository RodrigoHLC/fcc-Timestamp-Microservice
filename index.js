// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// ---- MY CODE STARTS HERE ----
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ 
app.get("/api/:date?", (req, res)=>{
  // --- GET USER INPUT
  let date = req.params.date;
  // --- IF DATE IS EMPTY, RETURN CURRENT TIME
  if(!date){
    res.json({
      "unix": new Date().getTime(),
      "utc": new Date().toUTCString()
     })
  };
  // --- IF DATE IS INVALID, AND NOT A UNIX TIMESTAMP
  let reg = /^[0-9]+$/;
  if( isNaN(new Date(date).getTime()) && reg.test(date) == false ){
    res.json({"error": "Invalid Date"})
  }
  // --- IF DATE IS A UNIX TIMESTAMP
  else if(reg.test(date)){
    res.json({
      "unix": date.toString(),
      "uct": new Date(parseInt(date)).toUTCString()
    })
  }
  // // --- IF DATE IS DATE STRING
  else{
    res.json({
      "unix": new Date(date).getTime(),
      "utc":  new Date(date).toUTCString()
    })
  }
})
