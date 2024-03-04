// import module Start
const express = require('express');
const app = express();
require('./src/config/database');
const bodyParser = require('body-parser');
const userRoutes = require('./src/router/userRoutes');
const orderRoutes = require('./src/router/orderRoutes');
const checklistRoutes = require('./src/router/checklistRoutes');
helper = require('./src/config/helper');
// import module End

// basic function start
empty = function empty(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
// basic function end

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use('/api/v1/',userRoutes,checklistRoutes);
app.use('/api/v1/orders/',orderRoutes);
// app.use('/api/v1/checklist/',checklistRoutes);


module.exports = app;