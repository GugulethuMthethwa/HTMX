// Set-ExecutionPolicy Unrestricted -Scope Process
import express from 'express';
const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

let currentPrice = 60;  // current estimated price of bitcoin

// Define a route handler for GET requests to the '/get-price' URL
app.get('/get-price', (req, res) => {

    // Simulate a price change by adding a random number between -1 and 1 to the current price
    currentPrice = currentPrice + Math.random() * 2 - 1;
    
    // Send the updated price back as a response, formatted to 1 decimal place
    res.send('$' + currentPrice.toFixed(1));  // 'toFixed(1)' ensures the price has 1 decimal place
});



// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});