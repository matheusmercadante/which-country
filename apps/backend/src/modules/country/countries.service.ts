import { inject, injectable } from 'tsyringe';

import { ICountriesClient } from '../../clients/countries.client';
import { COUNTRY_CLIENT_SYMBOL } from '../../di-tokens';

@injectable()
export default class CountriesService {
  constructor(
    @inject(COUNTRY_CLIENT_SYMBOL) private countriesClient: ICountriesClient
  ) {}

  public async getCountryInformations(name: string) {
    return this.countriesClient.searchCountryInformationByName(name);
  }
}
