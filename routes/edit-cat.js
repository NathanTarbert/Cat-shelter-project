var express = require('express');

/* GET a single cat to edit. */
router.get('/:id', function(req, res, next) {
    console.log('edit cats', req.params.id);
      let theCat = cats.find((cat) => {
       console.log("a single cat" ,cat.id);
       return cat.id == req.params.id;
      });
      console.log("the cat is ", theCat);
      res.render('edit-cat', { title: 'Edit Cat', cat: theCat, catBreeds:breeds });        
    });
    