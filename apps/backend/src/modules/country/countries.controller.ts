import { container, inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';

import CountriesService from './countries.service';

@injectable()
export default class CountriesController {
  constructor(
    @inject(CountriesService)
    private countriesService: CountriesService
  ) {}

  public async getCountryInformation(req: Request, res: Response) {
    const countryName = req.params.name;

    const countryInformations =
      await this.countriesService.getCountryInformations(countryName);

    return res.json(countryInformations);
  }
}
