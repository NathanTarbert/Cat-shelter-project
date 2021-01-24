var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var catBreeds = require('../data/breeds.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("catBreeds", catBreeds);
  res.render('add-cat', { title: 'Add Cat Form', catBreeds: catBreeds });//add-breed is the HBS template name
});

router.post('/', (req, res, next) => {
  let form = new formidable.IncomingForm();
  // console.log("the form is", form);
  form.parse(req, (err, fields,files) => { 
    if(err) throw err;
  // console.log("the field is", fields, "the file is", files);
  let oldPath = files.image.path;
  console.log(oldPath);
  let newPath = "C:/Users/Nate4/OneDrive/Desktop/kingsland/Projects/cat-shelter/public/images/" + files.image.name;
  console.log("the path is", newPath);

  let id = fields.id;
  let name = fields.name;
  let description = fields.description;
  let breed = fields.breed;
  // let image = newPath;
  let catImage = files.image.name;

  let catObj = {
    id :1,
    name: name,
    description :description,
    breed :breed,
    image :catImage
  };
  // console.log("obj is", catObj);

  fs.rename(oldPath,newPath, (err) => {
    if(err) throw err;
    console.log("file was uploaded successfully");
  });
  fs.readFile('./data/cats.json', 'utf8', (err, data) => {
    if(err) throw err;
    let allCats = JSON.parse(data);  
    let newCat = req.body.cat;     
    // console.log("all cats is", allCats);
    // let newId = oldPath.match(/[\A-Za-z0-9]+$/g)[0];
    allCats.push(catObj);
    let json = JSON.stringify(allCats);
    // console.log(json);
    fs.writeFile('./data/cats.json', json, 'utf8', (err) => {
      if(err) throw err;
      res.writeHead(302, {location: "/"});
      res.end();
    });      
    });  
  });
});

module.exports = router;
