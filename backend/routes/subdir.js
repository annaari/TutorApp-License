import path from 'path';
import express from 'express';

const router = express.Router();


router.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views','subdir','index.html'))
});

router.get('/test', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views','subdir','test.html'))
});


export default router;