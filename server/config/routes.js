// routes.js

module.exports = function(app, router) {
  router.use(function(req, res, next) {
    console.log("%s %s %s", req.method, req.url, req.path);
    next();
  });

  // API

  // Frontend routes: route all to public root and delegate to angular
  router.use("*", function(req, res) {
    res.sendfile("./public/views/index.html");
  });

  app.use("*", router);
};