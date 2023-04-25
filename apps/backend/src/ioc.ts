import { container } from 'tsyringe';
import { COUNTRY_CLIENT_SYMBOL } from './di-tokens';

import { CountriesClient, ICountriesClient } from './clients/countries.client';

container.registerSingleton<ICountriesClient>(
  COUNTRY_CLIENT_SYMBOL,
  CountriesClient
);
