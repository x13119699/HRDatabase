//the following code is referenced from the following sources//
//https://github.com/InspektorKukeke/USERDATABASE in order to delete a record with the splice record.
//https://github.com/mikhail-nci/wad-simple-demo in order to make the get and post requests and to add a record to the table.

var http = require('http'),
  path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  js2xmlparser = require('js2xmlparser'),
  libxslt = require('libxslt');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

// GET request to dislay index.html located inside /views folder
router.get('/', function(req, res) {
  res.render('index');
});

// HTML produced by XSL Transformation
router.get('/get/html', function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  var docSource = fs.readFileSync('Staff.xml', 'utf8');
  var stylesheetSource = fs.readFileSync('Staff.xsl', 'utf8');

  var doc = libxslt.libxmljs.parseXml(docSource);
  var stylesheet = libxslt.parse(stylesheetSource);

  var result = stylesheet.apply(doc);

  res.end(result.toString());

});


// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {
  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {
    // Read in a JSON file
    var JSONfile = fs.readFileSync('Staff.json', 'utf8');
    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);
    // Add a new record into country array within the JSON file    
    JSONparsed.member.push(obj);
    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);
    // Write the updated JSON file back to the system 
    fs.writeFileSync('Staff.json', JSONformated);
    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser.parse('staff', JSON.parse(JSONformated));
    // Write the resulting XML back to the system
    fs.writeFileSync('Staff.xml', XMLformated);
  }
  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');
});


// POST request to delete a record
router.post('/delete/json', function(req, res) {
  // Function to read in a JSON file, add to it & convert to XML
  function deleteEntryJSON(obj) {
    // Read in a JSON file
    var JSONfile = fs.readFileSync('Staff.json', 'utf8');
    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);
    //  JSONparsed.person.splice(JSONparsed.person.length-1, 1);
    //Removing a record from parsed json file using splice() 
    var index = -1;
    for (var i = 0; i != JSONparsed.member.length; i++) {
      if (JSONparsed.member[i].StaffId === obj.StaffId) {
        index = i;
      }
    }
    if (index != -1) {
      JSONparsed.member.splice(index, 1);
    }
    var JSONformated = JSON.stringify(JSONparsed, null, 4);
    // Write the updated JSON file back to the system 
    fs.writeFileSync('Staff.json', JSONformated);
    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser.parse("staff", JSON.parse(JSONformated));
    // Write the resulting XML back to the system
    fs.writeFileSync('Staff.xml', XMLformated);
  }
  // Call appendJSON function and pass in body of the current POST request
  deleteEntryJSON(req.body);
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});