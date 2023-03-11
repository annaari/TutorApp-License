import path from 'path';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: "Hello!"});
});

// router.get('/new-page', (req, res) => {
//     res.sendFile(path.join(process.cwd(), 'views','new-page.html'))
// });

// router.get('/old-page', (req, res) => {
//     res.redirect(301, '/new-page')
// });


export default router;