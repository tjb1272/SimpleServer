const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' })


app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000)

var http = require('http');
var options = {method: 'HEAD', port: 3000, path: '/'};
var req = http.request(options, function(res) {
    console.log(JSON.stringify(res.headers));
  }
);
req.end();



let finalstory = [
    {name: 'George', animal: 'Tiger', years: 5},
    {name: 'Joan', animal: 'Horse', years: 2},
    {name: 'Rick', animal: 'Dog', years: 14},
    {name: 'Samantha', animal: 'Cat', years: 8} 
]

app.get('/', (req, res) => {
    res.render('home')
})


app.post('/', (req, res) => {
    console.log('Name: ' + req.body.name);
    console.log('Animal: ' + req.body.animal);
    console.log('Years: ' + req.body.years);
    finalstory.push(req.body)
    res.send(finalstory)
    res.render(finalstory)
})


app.get('/', (req, res) => {
    console.log('Name: ' + res.body.name);
    console.log('Animal: ' + res.body.animal);
    console.log('Years: ' + res.body.years);
    res.send(finalstory);
})
  

app.put('/', (req, res) => {
    for(let i=0; 1 < finalstory.length; i++) {
        if(req.body.name === finalstory[i].name) {
            finalstory[i].animal = req.body.animal;
            res.send(finalstory)
        } else { 
            if (req.body.name === finalstory[i].name) {
                finalstory[i].years = req.body.years;
                res.send(finalstory) 
            }
        }
    }
})


app.delete('/:name', (req, res) => {
    for(let i = 0; i < finalstory.length; i++) {
        if(req.params['name'] === finalstory[i].name) {
            finalstory.splice(i, 1);
            res.send(finalstory); 
        } else {
            continue
        }
    }
})


app.use((req, res) => {
    res.status(400);
    res.render('404');
});


app.listen(3000, () => {
    console.log('server running')
})
 
