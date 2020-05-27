const {Router} = require('express');
const router = Router();
<<<<<<< HEAD

=======
>>>>>>> e11d0af92ba68da4f6fcf8a24b406c1effc7eeee
const controller = require('../controllers/products');

router.get('/', controller.getAll);
router.post('/', controller.addById);

module.exports = router;
