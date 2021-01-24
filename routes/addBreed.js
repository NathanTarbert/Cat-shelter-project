var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add-breed', { title: 'Add Breed Form', cat: 'some cat' });//add-breed is the HBS template name
});

router.post('/', (req, res, next) => {
    console.log('get the breed', req.body.breed);
    let formData = "";

    req.on('data', (data) => {
      // console.log("the breed form data is ", data.toString());
      formData += data;
      // console.log("the new data is ", formData);
      let parsedData = qs.parse(formData);
      // console.log(parsedData.breed);

      fs.readFile('./data/breeds.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        let newBreed = req.body.breed;
        let currentBreeds = JSON.parse(data);
        // console.log("this is current", currentBreeds);
        currentBreeds.push(newBreed);
        // console.log("parsed data is", currentBreeds);
        let updatedBreeds = JSON.stringify(currentBreeds);
        // console.log(updatedBreeds);

        fs.writeFile('./data/breeds.json', updatedBreeds, 'utf-8', () => {
          console.log("the breed was successfully uploaded...");
        });
        res.writeHead(301, { location: '/'});
        res.end();
        console.log('someone click post');
    res.render('index');
      });
    });
});

module.exports = router;
