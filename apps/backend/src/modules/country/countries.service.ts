import { inject, injectable } from 'tsyringe';

import { ICountriesClient } from '../../clients/countries.client';
import { COUNTRY_CLIENT_SYMBOL } from '../../di-tokens';

import { CountryEntity, CountryProps } from './country.entity';
import AppError from '../../shared/errors/app.error';

@injectable()
export default class CountriesService {
  constructor(
    @inject(COUNTRY_CLIENT_SYMBOL) private countriesClient: ICountriesClient
  ) {}

  public async getCountryInformations(name: string): Promise<CountryProps> {
    const informations =
      await this.countriesClient.searchCountryInformationByName(name);

    if (!informations) throw new AppError('country not found', 404);

    const country = CountryEntity.create({ name, informations });

    return country.toJSON();
  }
}
