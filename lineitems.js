var express = require('express');
var router = express.Router();

/*
 * GET list of lineitems
 */
router.get('/lineitems', function(req, res) {
	var db = req.db;
	var collection = db.get('lineitemlist');
	collection.find({},{}, function(e, docs) {
		res.json(docs);
	});
});

module.exports = router;