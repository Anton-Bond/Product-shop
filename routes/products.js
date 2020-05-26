const {Router} = require('express');
const router = Router();
const controller = require('../controllers/products');

router.get('/', controller.getAll);
router.post('/', controller.addById);

module.exports = router;
