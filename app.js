const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();
app.use(
    cors({
        origin : "https://densho1.github.io",
    })
)

app.use('/', express.static(__dirname));

app.use((req, res) => {
    res.status(404);
    res.send(`<h1>Error 404: Resource not found</h1>`)
})

app.listen(3000, () => {
    console.log("App is listening to port 3000");
})