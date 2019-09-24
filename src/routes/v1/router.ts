import express from 'express';
import providerController from '../../lib/Providers/ProviderController';

const { getProviders, getQuestions } = providerController;

const router = express.Router();

router.get('/providers', getProviders)
router.post('/providers/questions', getQuestions)

router.all('*', (request, response) => response.status(404)
    .json({ message: 'oops! This2 page does not exist' }),
);

export { router };