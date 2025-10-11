const express = require('express');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const customStatuses = {};

router.post('/statuses', upload.single('image'), (req, res) => {
  const { status } = req.body;
  if (!req.file || !status) {
    return res.status(400).send('Missing status or image.');
  }

  customStatuses[status] = {
    buffer: req.file.buffer,
    mimetype: req.file.mimetype,
  };

  res.setHeader('Cache-Control', 'no-store');
  res.status(201).send({ status, message: 'Status cat created successfully.' });
});

router.get('/statuses', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.json(Object.keys(customStatuses));
});

router.get('/images/:status', (req, res) => {
  const { status } = req.params;
  const image = customStatuses[status];

  if (!image) {
    return res.status(404).send('Not found.');
  }

  res.setHeader('Content-Type', image.mimetype);
  res.setHeader('Cache-Control', 'no-store');
  res.send(image.buffer);
});

module.exports = router;
