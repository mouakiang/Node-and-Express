//require exported express application and start server, assigning port server to 5000
const {PORT = 5000} = process.env;
const app = require("./app");

//will work when server is triggered and run following statement
const listener = () => console.log(`Server is running on Port ${PORT}!`);

//runs the server and takes in 2 arguments. Once server is running listener function will trigger and PORT will be used accordingly to be stated in the listener function.
app.listen(PORT, listener);

