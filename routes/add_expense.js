var express = require('express');
var router = express.Router();

// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/budgetr');
var collection = db.get('lineItemList');

var names = [];

collection.find({}, { name: 1 }, function(e, docs) { docs.forEach(function(user) {
	names.push(user.name);
}) });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add_expense', { title: 'Budgetr - Add Expense',
  								lineItemData: names });
});

/* POST new expense. */
router.post('/addexpense', function(req, res) {
	var accountId = 0;

	collection.find({name : req.body.account}, {}, function(e, docs) {
		docs.forEach(function(item) {
			accountId = item._id;
			console.log(accountId);
			req.body.accountId = accountId;
			db.get('expenseList').insert(req.body, function(err, result) {
				res.send(
					(err === null) ? { msg: "", id: result._id } : { msg: err}
				);
			});
		})
	});
});

module.exports = router;
