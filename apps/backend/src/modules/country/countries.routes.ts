import { Router } from 'express';
import CountriesController from './countries.controller';
import { container } from 'tsyringe';

const countriesRouter = Router();
const countriesController = container.resolve(CountriesController);

countriesRouter.get('/:name', (req, res) =>
  countriesController.getCountryInformation(req, res)
);

export default countriesRouter;
