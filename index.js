const express = require('express');
const apiRouter = require('./app/routes/api');
const apiResponse = require('./app/helpers/apiResponse');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config()

// Initialize express server app
const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// To allow cross-origin requests
app.use(cors());

// Route Prefixes
app.use('/api/v1/', apiRouter);

// Throw 404 if URL not found
app.all('*', function(req, res) {
    return apiResponse.notFoundResponse(res, 'Page not found');
});

app.use((err, req, res) => {
    if(err.name == 'UnauthorizedError'){
        return apiResponse.unauthorizedResponse(res, err.message);
    }
});


app.listen(port)

console.log('App is listening on port ' + port)