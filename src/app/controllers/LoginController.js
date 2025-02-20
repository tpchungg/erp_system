const { render } = require('node-sass');
const Login = require('../models/Login');
const { multipleMongooseToObject } = require('../../util/mongoose');
class LoginController {
    /*async post(req, res, next) {
        Login.findOne({name: req.body.name})
        .then(login => {
            if (check.password===req.body.password) {
                res.render("index");
            }
            else {
                res.send("wrong pasword");
            }
        })   
        .catch(error => next());
    }*/
        async index(req, res, next) {
            Login.find({})
            .then(login => {
              res.render('login', { 
                login: multipleMongooseToObject(login) 
              });
            })
            .catch(error => next());
          }
}
module.exports = new LoginController;