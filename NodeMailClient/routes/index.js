
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.partial = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};