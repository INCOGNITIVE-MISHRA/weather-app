const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html")
   
})
 
app.post("/", function(req, res){
    
const query = req.body.cityName;
const apiKey = "ee919d1a1c7dc536816a5cf896373c51";
const unit = "metric"    

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey+ "&units=" + unit;

https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const Wheatherdata = JSON.parse(data)
       const temp = Wheatherdata.main.temp
       const description = Wheatherdata.weather[0].description

       const icon = Wheatherdata.weather[0].icon

       const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p> The weather is currently " + description + "</p>");
      res.write("<h1> The temperture in " + query + " is " + temp + "degree celcius.</h1>");
      res.write("<img src =" + imageurl + ">");

      res.send()
      
    })
})

})



app.listen(3000, function(){
    console.log("Server is running on port 3000");
})