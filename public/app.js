const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
	auth: {
		user:'admin',
		password:'1234'
	}
});

const dbName = 'stock';
const viewUrl = '_design/all_stock/_view/new-view';

couch.listDatabases().then(function(dbs){
	console.log(dbs);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'))


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function (req, res) {
	couch.get(dbName, viewUrl).then(
		function (data, headers, status){
			console.log(data.data.rows);
			res.render('index', {
				stock: data.data.rows
			});
		},
		function (err) {
			res.send(err);
		});
});

app.post('/stock/add', function (req, res) {
	
		const name = req.body.name;
	const item_id = req.body.item_id;
	const quantity = req.body.quantity;
	const date = req.body.date;
	const cost = req.body.cost;

	couch.uniqid().then(function (ids) {
		const id = ids[0];

		couch.insert('stock', {
			_id: id,
			item_id: item_id,
			name: name,
			quantity: quantity,
			date: date,
			cost: cost
		}).then(
			function (data, headers, status) {
				res.redirect('/');
			},
			function (err) {
				res.send(err);
			});
	});
});

	app.listen(5000, function () {
		console.log('server started on port 3000');
	}); 