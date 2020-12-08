var search = require('../models/search');

exports.Results = async () => {
    var value = req.body.search;
    results = search.Search(value);
}