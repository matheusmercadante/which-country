import { clientsConfig } from '../configs';

export interface ICountryInformation {
  officialName: string;
  name: string;
  capitais: string[];
  population: string;
  subregion: string;
  languages: { [c: string]: string };
  currencies: { [c: string]: { name: string; symbol: string } };
  flag: {
    url: string;
    unicode: string[];
    alt: string;
  };
}

export interface ICountriesClient {
  searchCountryInformationByName(name: string): Promise<ICountryInformation[]>;
}

export class CountriesClient implements ICountriesClient {
  public static API_URL = clientsConfig.COUNTRY_API_URL;

  public async searchCountryInformationByName(
    name: string
  ): Promise<ICountryInformation[]> {
    const filterFields = [
      'name',
      'capital',
      'currencies',
      'population',
      'timezones',
      'flags',
      'flag',
      'subregion',
      'languages',
    ].join(',');

    const result = await (
      await fetch(
        `${CountriesClient.API_URL}/name/${name}?fields=${filterFields}`,
        {
          method: 'GET',
        }
      )
    ).json();

    return result.map(
      (country): ICountryInformation => ({
        officialName: country.name.official,
        name: country.name.common,
        capitais: country.capital,
        currencies: country.currencies,
        population: country.population,
        subregion: country.subregion,
        languages: country.languages,
        flag: {
          url: country.flags.svg,
          unicode: country.flag.split('\\'),
          alt: country.flags.alt,
        },
      })
    );
  }
}
