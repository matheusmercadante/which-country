import { Router } from 'express';

import countriesRouter from '../modules/country/countries.routes';

const routes = Router();

routes.use('/countries', countriesRouter);

export default routes;
