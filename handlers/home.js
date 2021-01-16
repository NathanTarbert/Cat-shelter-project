const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require ('../data/breeds.json');
const cats = require('../data/cats.json');

module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;
  // console.log("[home.js 10]home pathname is ", pathname);
  if (pathname === '/' && req.method === 'GET') {
    // Implement the logic for showing the home html view
    let filePath = path.normalize(
      path.join(__dirname, '../views/home/index.html')
    );
    
    const index = fs.createReadStream(filePath);
    index.on('data', (data) => {
      // console.log(data);
      let modifiedCats = cats.map( (cat) => `
      <li>
        <img src="${path.join('C:/Users/Nate4/OneDrive/Desktop/kingsland/Projects/cat-shelter/content/images/' + cat.image)}">
        <h3>${cat.name}</h3>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
          <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
          <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
        </ul>
      </li>`);
      let modifiedData = data.toString().replace('{{cats}}', modifiedCats);
      res.write(modifiedData);
    });
    index.on('end', () => {
      res.end();
    })
    index.on('error', (err) => {
      console.log(err);
    });

  } else if (pathname === '/cats/add-cat' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

    const index = fs.createReadStream(filePath);
    // console.log("the index is", index);
    index.on('data', (data) => {
      // console.log("the breeds are", breeds);
      let catBreedPlaceHolder = breeds.map((breed) => `<option value="${breed}">${breed}</option>` );
      // console.log(catBreedPlaceHolder);
      let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceHolder);
      res.write(modifiedData);
    });
    index.on('end', () => {
      res.end();
    });
    index.on('error', (err) => {
      console.log(err);
    });

  } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

    const index = fs.createReadStream(filePath);

    index.on('data', (data) => {
      res.write(data);
    });
    index.on('end', () => {
      res.end();
    });
    index.on('error', (err) => {
      console.log(err);
    });
  } else if (pathname === '/cats/add-cat' && req.method === 'POST') {

    // const index = fs.createReadStream(filePath);
    let form = new formidable.IncomingForm();
    // console.log("the form is", form);
    form.parse(req, (err, fields,files) => { 
      if(err) throw err;
    // console.log("the field is", fields, "the file is", files);
    let oldPath = files.image.path;
    // console.log(oldPath);
    let newPath = path.normalize(path.join("C:/Users/Nate4/OneDrive/Desktop/kingsland/Projects/cat-shelter/content/images/" + files.image.name));
    // console.log(newPath);
    let id = fields.id;
    let name = fields.name;
    let description = fields.description;
    let breed = fields.breed;
    let image = newPath;
    
    let catObj = {
      id :1,
      name: name,
      description :description,
      breed :breed,
      image :image
    };
    // console.log("obj is", catObj);

    fs.rename(oldPath,newPath, (err) => {
      if(err) throw err;
      console.log("file was uploaded successfully");
    });
    fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
      if(err) throw err;
      let allCats = JSON.parse(data);       
      // console.log("all cats is", allCats);
      // let newId = oldPath.match(/[\A-Za-z0-9]+$/g)[0];
      allCats.push(catObj);
      let json = JSON.stringify(allCats);
      // console.log(json);
      fs.writeFile('./data/cats.json', json, () => {
        res.writeHead(302, {location: "/"});
        res.end();
      });    
       
      });      
      
    });

    // index.on('data', (data) => {      
    //   res.write(data);
    // });
    // index.on('end', () => {
    //   res.end();
    // });
    // index.on('error', (err) => {
    //   console.log(err);
    // });

  } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
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
        let currentBreeds = JSON.parse(data);
        // console.log("this is current", currentBreeds);
        currentBreeds.push(parsedData.breed);
        // console.log("parsed data is", currentBreeds);
        let updatedBreeds = JSON.stringify(currentBreeds);
        // console.log(updatedBreeds);

        fs.writeFile('./data/breeds.json', updatedBreeds, 'utf-8', () => {
          console.log("the breed was successfully uploaded...");
        });
        res.writeHead(301, { location: '/'});
        res.end();
      });
    });
  } else {
    return true;
  }
}; 