// Require the Express module
const express = require('express');
const { join } = require('path');
const app = express();

app.use(express.static(join(process.cwd(), 'public')))

app.get('/', () => {
    res.send('hi')
})
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})