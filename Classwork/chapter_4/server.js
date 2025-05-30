// server.js
import express from 'express';

const app = express();

// Serve static files (like index.html) from the 'public' folder
app.use(express.static('public'));

// Parse form and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle HTMX search request
app.post('/search', async (req, res) => {
    const searchTerm = req.body.search?.toLowerCase().trim();

    if (!searchTerm) {
        return res.send('<tr><td colspan="2">Start typing to see results...</td></tr>');
    }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const searchResults = users.filter((user) => {
            const name = user.name.toLowerCase();
            const email = user.email.toLowerCase();
            return name.includes(searchTerm) || email.includes(searchTerm);
        });

        if (searchResults.length === 0) {
            return res.send('<tr><td colspan="2">No users found.</td></tr>');
        }

        const html = searchResults
            .map(user => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>
            `)
            .join('');

        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('<tr><td colspan="2">Error fetching data.</td></tr>');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
