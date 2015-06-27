var express = require('express');
var router = express.Router();

/*
 * GET list of lineitems
 */
router.get('/', function(req, res) {
	var db = req.db;
	var collection = db.get('lineItemList');
	collection.find({},{}, function(e, docs) {
		res.json(docs);
	});
});

router.get('/:id', function(req, res) {
	var db = req.db;
	var lineItemCollection = db.get('lineItemList');
	var expenseCollection = db.get('expenseList');
    lineItemCollection.find({_id: req.params.id}, {}, function(e, docs) {
        docs.forEach(function(lineItem) {
            var expenses = [];
            expenseCollection.find({accountId: lineItem._id}, {}, function(err, expenseDocs) {
                expenseDocs.forEach(function(expense) {
                    expenses.push(JSON.stringify(expense));
                    process.stdout.write('pushing!');
                });
                process.stdout.write(JSON.stringify(expenses));
                res.render('lineitem', {
                    title: 'Budgetr - Line Item Viewer',
                    lineItem: lineItem,
                    expenses: JSON.stringify(expenses)
                });
            });
        });
    })
});

/*
 * POST to addlineitem
 */
router.post('/addlineitem', function(req, res) {
	var db = req.db;
	var colleciton = db.get('lineitemlist');
	collection.insert(req.body, function(err, result) {
		res.send(
			(err === null) ? { msg: ''} : { msg: err }
		);
	});
});

module.exports = router;