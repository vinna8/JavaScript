const express = require('express');
const corsMiddleware = require('./middleware/cors.middleware');

const app = express();

app.use(corsMiddleware);
app.use(express.static(__dirname + '/files'));
app.use('/api', require('./routes/file.routes'));

const PORT = 3001;

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`${PORT}`);
}) 