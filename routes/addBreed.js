var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add-breed', { title: 'Add Breed Form' });//add-breed is the HBS template name
});

router.post('/', (req, res, next) => {
    console.log('get the breed', req.body.breed);

      fs.readFile('./data/breeds.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        
        let currentBreeds = JSON.parse(data);
        let newBreed = req.body.breed;
        // console.log("this is current", currentBreeds);
        currentBreeds.push(newBreed);
        // console.log("parsed data is", currentBreeds);
        let updatedBreeds = JSON.stringify(currentBreeds);
        // console.log(updatedBreeds);

        fs.writeFile('./data/breeds.json', updatedBreeds, 'utf-8', (err) => {
          if(err) throw err;
          console.log("the breed was successfully uploaded...");
        });
        res.writeHead(302, { location: '/'});
        res.end();
      });
});

module.exports = router;
