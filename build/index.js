"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deliveries_1 = __importDefault(require("./routes/deliveries"));
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(morgan('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.get('/ping', (_req, res) => {
    console.log('pinged here ' + new Date().toLocaleDateString());
    res.send('pong');
});
app.use('/api/deliveries', deliveries_1.default);
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
