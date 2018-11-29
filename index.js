var liveKey = 'YOUR_LIVEKEY'
var testKey = 'YOUR_TESTKEY'

const express = require('express')
var stripe = require('stripe')(testKey)
var bodyParser = require('body-parser')
const path = require('path')

const PORT = process.env.PORT || 5000
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended : true
}))

app.set('port', (process.env.PORT || 5000))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.post('/charge', (req, res)=>{
  var amount = req.body.amount
  var currency = req.body.currency
  var token = req.body.source
  var email = req.body.email
  var description = req.body.description
 
  stripe.charges.create({
    source : token,
    currency : currency,
    amount : amount,
    receipt_email: email,
    description: description
    
  }, function(err, charge){
    if (err){
       res.status(500).end()
     }else{
      res.status(200).send()
     }
  })

})

  app.listen(app.get('port'), function(){
    console.log('Node app is running on port', app.get('port'))
  } )
