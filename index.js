const express = require("express");
const https = require("https"); // https is native node module
const bodyParser = require('body-parser');
const { urlencoded } = require("body-parser");






const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get('/',(req,res)=>{

    res.sendFile(__dirname+"/index.html");

    
    
  



})

app.post('/',(req,res)=>{
    var query = req.body.cityName;
    const apiKey = "2f4ff75fc4f62bb3c565eee503b173cf";
    var unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

https.get(url,(response)=>{
    console.log(response.statusCode);
    response.on("data",(data)=>{
        
        const wheaterData= JSON.parse(data);
        const temp = wheaterData.main.temp;
        const desc = wheaterData.weather[0].description;
        const icon = wheaterData.weather[0].icon;
        const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        // const object = {
        //     name: "Shaman",
        //     FavouriteFood:'pizza'
        // }
        // const obj = JSON.stringify(JSON.parse(data));
        // console.log(temp);
        console.log(wheaterData);
        res.write("<p>The weather is currently "+desc+"</p>");
        res.write("<h1>The temperature in "+query+" is "+temp+" degree celcius.</h1>");
        res.write("<img src="+imgUrl+">");
        res.send();
    })

})

    

})


app.listen(3000,()=>{
    console.log('Server is Running');
})



// 401 unauthorized auntheication
// 404 not found 
// 200 ok status code
// 402 





// npm install body-parser
