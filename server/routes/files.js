import express from 'express';

const router = express.Router();

router.post('/upload', upload.array('files'), (req, res) => {
    res.send('Files uploaded successfully!');
});

export default router;