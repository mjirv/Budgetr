var express = require('express');
var router = express.Router();	// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/budgetr');
var collection = db.get('expenseList');

/* GET added page. */
router.get('/:id', function(req, res, next) {
	var body = "";
	collection.find({_id: req.params.id}, {}, function(e, docs) {
		docs.forEach(function(user) {
			body = user;
			res.render('added', {
				title: 'Budgetr - Successfully Submitted Expense',
				data: body
			});
		});
	});
});

module.exports = router;
