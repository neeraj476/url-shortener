// routes/urlRoutes.js
import express from 'express';
import { shortenUrl ,redirectUrl} from '../controllers/urlController.js';

const router = express.Router();

// Route to create a short URL
router.post('/shorten', shortenUrl);

// Route to handle redirection
router.get('/:shortId', redirectUrl);

export default router;
