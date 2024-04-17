// Require the Express module
const express = require('express');
const { join } = require('path');
const app = express();

app.use(express.static(join(process.cwd(), 'public')))

app.get('/*', (req, res) => res.redirect('/homepage.html'))

app.listen(5000, () => {
    console.log(`http://localhost:5000`)
})