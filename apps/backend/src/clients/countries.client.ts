import { clientsConfig } from '../configs';

export interface ICountriesClient {
  searchCountryInformationByName(name: string): Promise<any>;
}

export class CountriesClient implements ICountriesClient {
  public static API_URL = clientsConfig.COUNTRY_API_URL;

  public async searchCountryInformationByName(name: string) {
    const result = await fetch(`${CountriesClient.API_URL}/name/${name}`, {
      method: 'GET',
    });

    const infos = await result.json();

    return infos;

    // return {
    //   officialName: infos.name.official,
    // }
  }
}
