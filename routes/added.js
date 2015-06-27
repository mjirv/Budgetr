var express = require('express');
var router = express.Router();	// Database

/* GET added page. */
router.get('/:id', function(req, res, next) {
    var db = req.db;
    var collection = db.get('expenseList');
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
