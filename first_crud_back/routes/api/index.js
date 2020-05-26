var express = require('express');
var router = express.Router({ margeParams : true });

const tutorials = require('../../controller/TutorialController');

router.get('/', tutorials.findAll);
router.get('/published', tutorials.findAllPublished);
router.get('/:id', tutorials.findOne);

router.post('/', tutorials.create);

router.put('/:id', tutorials.update);

router.delete('/:id', tutorials.delete);
router.delete('/', tutorials.deleteAll);

module.exports = router;
