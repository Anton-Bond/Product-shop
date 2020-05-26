const {Router} = require('express');
const router = Router();
const controller = require('../controllers/cart')

router.get('/', controller.getAll);
router.delete('/:id', controller.remove);

module.exports = router;
