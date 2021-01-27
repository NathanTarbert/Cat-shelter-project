var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
var formidable = require('formidable');
var catBreeds = require('../data/breeds.json');
var cats = require('../data/cats.json');


/* GET a single cat to edit. */
router.get('/:id', function(req, res, next) {
    // console.log('edit cats', req.params.id);
      let theCat = cats.find((cat) => {
       console.log("a single cat" ,cat);
       return cat.id == req.params.id;
      });
      let breedsSelected = [];
      catBreeds.forEach(b => {
        breedsSelected.push( {
          breed: b,
          selected: (b===theCat.breed) ? true : false
        });        
      });
      console.log("the cat is ", theCat.breed);
      res.render('edit-cat', { title: 'Edit Cat', cat: theCat, catBreeds: breedsSelected });        
});

// router.post('/:id', function(req, res, next) {
//   console.log("post edit-cat");
//   // call formidable to create new empty form object to populate
//   let uid = req.params.uid;
//   let form = new formidable.IncomingForm();
//   console.log("~form", form);
//   // now parse the completed form - fields holds whatever was typed in the form, files is a giant object with all the form data, including any submitted images
//   form.parse(req, (err, fields, files) => {
//     if(err) throw err;
//     console.log("~fields", fields);
//     console.log("~files", files);
      
//     let thisCat = cats.find((cat) => {//find the cat
//       return cat.id===uid;
//     });
//     console.log("this cat", thisCat);
// //   let oldPath = files.image.path;
// //   // console.log(oldPath);
// //   let newPath = "C:/Users/Nate4/OneDrive/Desktop/kingsland/Projects/cat-shelter/public/images/" + files.image.name;
// //   // console.log("the path is", newPath);

// //   let tempPicId = files.image.path;
// //   let temp = tempPicId.length;
// //   // slice off the end of file path name to create random id
// //   let catID = tempPicId.slice(66, temp);

// //   let name = fields.name;
// //   let description = fields.description;
// //   let breed = fields.breed;
// //   let image = newPath;
// //   let catImage = files.image.name;

// //   let catObj = {
// //     id : catID,
// //     name: name,
// //     description :description,
// //     breed :breed,
// //     image :catImage
// //   };
// //     console.log("obj is", catObj);

// //   fs.rename(oldPath,newPath, (err) => {
// //     if(err) throw err;
// //     console.log("file was uploaded successfully");
// //   });

// //   fs.readFile('./data/cats.json', 'utf8', (err, data) => {
// //     if(err) throw err;
// //     let allCats = JSON.parse(data);  
// //     let newCat = req.body.cat;     
// //     // console.log("all cats is", allCats);
// //     let newId = oldPath.match(/[\A-Za-z0-9]+$/g)[0];
// //     allCats.push(catObj);
// //     let catArray = JSON.stringify(allCats);
// //     console.log(catArray);
// //     fs.writeFile('./data/cats.json', catArray, 'utf8', (err) => {
// //       if(err) throw err;
// //       res.writeHead(204, {location: "/"});
// //       res.end();
// //     });      
// //     });  
// //   
//   let modifiedData = data.toString().replace('{{cats}}', editCats);
//   res.writeFile(cats, allCats, (err) => {
//      res.redirect('/');
//   });     
// });
// });
// module.exports = router;

    