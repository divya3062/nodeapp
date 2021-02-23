var express = require('express');
var router = express.Router();
var db=require('../database');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// another routes also appear here
// this script to fetch data from MySQL customers table
router.get('/user-list', function(req, res, next) {
    var sql='SELECT * FROM customers';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
    
  });
});



// this script to fetch data from MySQL customers table
router.get('/edit/:empId', function(req, res, next) {
  console.log(' Entered the /edit');
  console.log('req.params.empId--->'+req.params.empId);
  db.query('SELECT * FROM customers where id = ?', [req.params.empId], function (err, data, fields) {
  if (err) throw err;
  res.render('edit-list', { title: 'Edit an employee', userData: data});
  });
});




// this script to update an employee from MySQL customers table
router.post('/update', function(req, res, next) {
  console.log(' Entered the /update');
  db.query('UPDATE customers SET name = ? WHERE id = ?', [req.body.name,req.body.id], function (err, data, fields) {
  if (err) throw err;
  res.redirect('/users/user-list');
  console.log("Entry updated successfully");
  });
});



// this script to delete an employee from MySQL customers table
router.get('/delete/:empId', function(req, res, next) {
  console.log(' Entered the /delete');
  console.log('Delete the req.params.empId--->'+req.params.empId);
  db.query('DELETE FROM customers WHERE id = ?', [req.params.empId], function (err, data, fields) {
  if (err) throw err;
  res.redirect('/users/user-list');
  console.log("Entry deleted successfully");
  });
});


// this script to add an employee into MySQL customers table
router.post('/add', function(req, res, next) {
  console.log(' Entered the /add');
  db.query('INSERT INTO customers VALUES (?, ?, ?)', [req.body.email,req.body.name,'1'], function (err, data, fields) {
  if (err) throw err;
  res.redirect('/users/user-list');
  console.log("Entry added successfully");
  });
});


// this script to cancel the edit operation
router.get('/cancel', function(req, res, next) {
  console.log(' Entered the /cancel');
  res.redirect('/users/user-list');
  console.log("Entry cancelled successfully");
});

module.exports = router;