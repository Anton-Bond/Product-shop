const {Router} = require('express');
const router = Router();
const controller = require('../controllers/cart')

<<<<<<< HEAD
const controller = require('../controllers/cart')

router.get('/', controller.getAll);
router.delete('/:id', controller.remove);

=======
router.get('/', controller.getAll);
router.delete('/:id', controller.remove);

>>>>>>> e11d0af92ba68da4f6fcf8a24b406c1effc7eeee
module.exports = router;
