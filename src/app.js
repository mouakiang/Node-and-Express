// You require the Express package and assign it to a variable.
const express = require("express");
const app = express();

//Export middleware from validateZip file and data from getZoos file.
const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");
// app.use(morgan('dev'));

//ROUTES
// This route handler is defined for the "/check/:zip" endpoint.
app.get("/check/:zip", validateZip, (req, res, next) => {
  // A function getZoos() is called with the value of the "zip" parameter from the request.
  const zooList = getZoos(req.params.zip);
  // Check if the zooList variable has a truthy value (i.e., it exists).
  if (zooList) {
    // If zooList exists, create a message indicating that the zip exists in the records.
    const message = `${req.params.zip} exists in our records.`;
    // Send the message as the response to the client.
    res.send(message);
  } else {
    // If zooList does not exist, create a message indicating that the zip does not exist in the records.
    const message = `${req.params.zip} does not exist in our records.`;
    // Send the message as the response to the client.
    res.send(message);
  }
  // Call the "next" function to pass control to the next middleware in the request-response cycle.
  next();
});


// This route handler is defined for the "/zoos/all" endpoint.
app.get("/zoos/all",
        (req, res, next) => {  
  // Extract the value of the "admin" query parameter from the request.
  const admin = req.query.admin;  
  // Check if the admin parameter is set to "true".
  if (admin === "true") {
    // Retrieve all zoos using the getZoos() function and join them into a string separated by "; ".
    const allZoos = getZoos().join("; ");
    // Send a response containing the concatenated string of all zoos.
    res.send(`All zoos: ${allZoos}`);
  } else {
    // If the admin parameter is not "true", invoke the "next" function with an error message.
    next("You do not have access to that route.");
  }
});


// This route handler is defined for the "/zoos/:zip" endpoint.
app.get("/zoos/:zip",
    validateZip,
    (req, res, next) => {
    // Extract the value of the "zip" parameter from the request.
    const zip = req.params.zip;
    // Retrieve zoos matching the specified zip using the getZoos() function.
    const matchingZoos = getZoos(zip);
    // Check if any matching zoos were found.
    if (matchingZoos.length > 0) {
      // If matching zoos exist, send a response containing the zip and the joined list of zoos.
      return res.send(`${zip} zoos: ${getZoos(zip).join("; ")}`);
    } else {
      // If no matching zoos were found, invoke the "next" function with an error message.
      next(`${zip} has no zoos.`);
    }
});


// Error handling middleware for handling route not found errors.
app.use((req, res, next) => {
  // Pass an error message to the "next" function.
  next("That route could not be found!");
});


// Error handling middleware for handling internal server errors.
app.use((err, req, res, next) => {
  // If the error is not provided, set a default error message.
  err = err || "Internal server error!";
  // Send the error message as the response.
  res.send(err);
});


// You export the Express application to be used in the server.js file.
module.exports = app;