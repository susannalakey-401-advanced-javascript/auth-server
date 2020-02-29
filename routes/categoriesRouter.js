const express = require('express');
const bearerAuth = require('../middleware/bearer-auth');
const acl = require('../middleware/accessControlList');

const Categories = require('../models/categories');
const categories = new Categories;

const router = express.Router();

const { listAll, listOne, updateItems, createItems, deleteItems } = require('./generalRouter');

router.get('/categories', bearerAuth, acl('read'), listAll(categories));
router.get('/categories/:id', bearerAuth, acl('read'), listOne(categories));
router.put('/categories/:id', bearerAuth, acl('update'), updateItems(categories));
router.post('/categories', bearerAuth, acl('create'), createItems(categories));
router.delete('/categories/:id', bearerAuth, acl('delete'), deleteItems(categories));


module.exports = router;