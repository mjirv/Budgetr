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