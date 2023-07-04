function validateZip(req, res, next) {
    // Extracting the value of 'zip' parameter from 'req.params' object and assigning it to the 'zip' constant variable
    const zip = req.params.zip  
    
    // Checking if 'zip' length is not equal to 5 and if it can be parsed as a valid number
    if (zip.length !== 5 && (parseFloat(zip) === Number(zip))) {  
      // Calling the 'next' function with an error message if the 'zip' value is invalid
      next(`Zip (${zip}) is invalid!`)  
      // Checking if 'zip' is not a number
    } else if (isNaN(zip)){  
      // Calling the 'next' function with an error message if the 'zip' value is invalid
      next(`Zip (${zip}) is invalid!`) 
    } else {
      // Calling the 'next' function without an error message if the 'zip' value is valid
      next()  
    }
}

// Exporting the 'validateZip' function as a module
module.exports = validateZip;  

