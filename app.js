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
app.get('/clients', function (req, res) {
	couch.get(dbName, viewUrl).then(
		function (data, headers, status){
			console.log(data.data.rows);
			res.render('clients', {
				customers: data.data.rows
			});
		},
		function (err) {
			res.send(err);
		});
});
app.get('/table', function (req, res) {
	couch.get(dbName, viewUrl).then(
		function (data, headers, status){
			console.log(data.data.rows);
			res.render('table', {
				stock: data.data.rows
			});
		},
		function (err) {
			res.send(err);
		});
});
app.get('/form', function (req, res) {
	couch.get(dbName, viewUrl).then(
		function (data, headers, status){
			console.log(data.data.rows);
			res.render('form', {
				customers: data.data.rows
			});
		},
		function (err) {
			res.send(err);
		});
});

app.get('/calendar', function (req, res) {
	couch.get(dbName, viewUrl).then(
		function (data, headers, status){
			console.log(data.data.rows);
			res.render('calendar', {
				customers: data.data.rows
			});
		},
		function (err) {
			res.send(err);
		});
});

app.get('/chart', function (req, res) {
	couch.get(dbName, viewUrl).then(
		function (data, headers, status){
			console.log(data.data.rows);
			res.render('chart', {
				customers: data.data.rows
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

app.post('/customers/add', function (req, res) {
	
	const Name = req.body.Name;
	const Total_Visits = req.body.Total_Visits;
	const DOB = req.body.DOB;


	couch.uniqid().then(function (ids) {
		const id = ids[0];

		couch.insert('stock', {
			_id: id,
			Total_Visits: Total_Visits,
			Name: Name,
			DOB: DOB
			
		}).then(
			function (data, headers, status) {
				res.redirect('/');
			},
			function (err) {
				res.send(err);
			});
	});
});

app.post('/payment/add', function (req, res) {
	
	const Names = req.body.Names;
	const Payment = req.body.Payment;
	const Payment_Date = req.body.Payment_Date;


	couch.uniqid().then(function (ids) {
		const id = ids[0];

		couch.insert('stock', {
			_id: id,
			Names: Names,
			Payment: Payment,
			Payment_Date: Payment_Date
			
		}).then(
			function (data, headers, status) {
				res.redirect('/');
			},
			function (err) {
				res.send(err);
			});
	});
});

//delete
app.post('/stock/delete/:id', function(req, res) {
    const id = req.params.id;
	const rev = req.body.rev;
	

	couch.del('stock', id, rev).then(
		function(data, headers, status){
			res.redirect('back');
		},
		function(err){
			res.send(err);
		}
	);
});
//delete


app.post('/stock/delete/:id', function(req, res) {
    const id = req.params.id;
	const rev = req.body.rev;
	

	couch.del('stock', id, rev).then(
		function(data, headers, status){
			res.redirect('back');
		},
		function(err){
			res.send(err);
		}
	);
});



	app.listen(5000, function () {
		console.log('server started on port 5000');
	}); 
	




