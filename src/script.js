/*back end*/ /*======tải express.js==========*/
'use strict';
const express = require('express'); /*lấy express trong node_modules để nạp vào const express*/ 
const morgan = require('morgan');
const { engine } = require ('express-handlebars');
const methodOverride = require('method-override')
const path = require('path');
const route = require('./routes/script.js'); //lấy file script.js trong thư mục routes
const db = require('./config/db/script.js'); //lấy file script.js trong thư mục db
const app = express(); /*gọi express để trả lại instance (trả lại 1 đối tượng đại diện cho ứng dụng nodejs)*/ 
const dotenv = require("dotenv");
const moment = require('moment');
const port = process.env.PORT || 5500; //port website
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(morgan("common"));
// Connect to db
db.connect(); //gọi hàm connect trong file script.js
app.use(express.urlencoded());
//HTTP logger
app.use(morgan('combined'));
//Template engine
app.engine('hbs', engine); //cấu hình handlebars
app.set('views', path.join(__dirname, 'resources/views')); //cấu hình đường dẫn views
app.engine('.hbs', engine({ 
  defaultLayout: 'main',  //cấu hình layout mặc định
  layoutsDir: path.join(app.get('views'), 'layouts'), //cấu hình đường dẫn layout
  partialsDir: path.join(app.get('views'), 'partials'), //cấu hình đường dẫn partials
  extname: '.hbs',
  helpers: {
    when: function(operand_1, operator, operand_2, options){
        console.log("Using the when helper:");
        console.log("operand_1: " + operand_1 + " operator: " + operator + " operand_2: " + operand_2);
        let operators = {
            'eq': function (l, r) {
                return l == r;
            },
            'gt': function(l, r) {
              return Number(l) > Number(r);
            },
            'lt': function(l, r) {
              return Number(l) < Number(r);
            },
            'noteq': function (l, r) {
                return l != r;
            },
            'or': function (l, r) {
                return l || r;
            },
            'and': function (l, r) {
                return l && r;
            },
            '%': function (l, r) {
                return (l % r) === 0;
            }
        }
        , result = operators[operator](operand_1, operand_2);

        if(result) return options.fn(this);
        else  return options.inverse(this);
    }
}
}));
app.set('view engine', '.hbs');
route(app); //gọi hàm route trong file script.js
// 127.0.0.1 - localhost
app.listen(port, () => { //lắng nghe port 5500, bắt đâu chạy server
  console.log(`App listening on port http://localhost:${port}`);
})

/*===============================================*/


