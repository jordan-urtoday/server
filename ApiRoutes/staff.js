import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('staff connection point');
})

export default router;