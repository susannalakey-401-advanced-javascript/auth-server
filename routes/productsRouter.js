const express = require('express');

const bearerAuth = require('../middleware/bearer-auth');
const acl = require('../middleware/accessControlList');

const Products = require('../models/products');
const products = new Products;
const { listAll, listOne, updateItems, createItems, deleteItems } = require('./generalRouter');
const router = express.Router();


router.get('/products', bearerAuth, acl('read'), listAll(products));
router.get('/products/:id', bearerAuth, acl('read'), listOne(products));
router.put('/products/:id', bearerAuth, acl('update'), updateItems(products));
router.post('/products', bearerAuth, acl('create'), createItems(products));
router.delete('/products/:id', bearerAuth, acl('delete'), deleteItems(products));


module.exports = router;