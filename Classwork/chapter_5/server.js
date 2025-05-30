// import express from 'express';
// const app = express();

// // Set static folder (if serving static assets like CSS, JS)
// app.use(express.static('public'));

// // Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded({ extended: true }));

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());

// // Handle POST request for email validation
// app.post('/email', (req, res) => {
//     const submittedEmail = req.body.email;
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     if (emailRegex.test(submittedEmail)) {
//         return res.send(`
//             <div class="alert alert-success" role="alert">
//                 That email is valid.
//             </div>
//         `);
//     } else {
//         return res.send(`
//             <div class="alert alert-danger" role="alert">
//                 Please enter a valid email address.
//             </div>
//         `);
//     }
// });

// // Start the server
// app.listen(3000, () => {
//     console.log('Server listening on port 3000');
// });


import express from 'express';
const app = express();

app.use(express.static('public'));                // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());                         // Parse JSON bodies

app.post('/submit', (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordMinLength = 6;

    if (!emailRegex.test(email)) {
        return res.send(`
            <div id="feedback" class="alert alert-danger" role="alert">
                Please enter a valid email address.
            </div>
        `);
    }

    if (password.length < passwordMinLength) {
        return res.send(`
            <div id="feedback" class="alert alert-danger" role="alert">
                Password must be at least ${passwordMinLength} characters long.
            </div>
        `);
    }

    return res.send(`
        <div id="feedback" class="alert alert-success" role="alert">
            Both email and password are valid!
        </div>
    `);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});