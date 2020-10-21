const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.readAllThing);
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.readThing);
router.put('/:id', auth, multer, stuffCtrl.updateThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;
