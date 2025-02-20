const { render } = require('node-sass');
class SiteController {
    // GET /trang-chu
    index(req, res) {
      res.render('home');
    }

  }
  module.exports = new SiteController;