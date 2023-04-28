export type CountryProps = {
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
  associates?: CountryProps[];
};

export type CreateCountryProps = {
  name: string;
  informations: CountryProps[];
};

export class CountryEntity {
  private props: CountryProps;

  private constructor(props: CountryProps) {
    this.props = props;
  }

  static create(data: CreateCountryProps): CountryEntity {
    const country =
      data.informations.find((info) => info.name.toLowerCase() === data.name) ||
      data.informations[0];

    const props = {
      ...country,
      ...data.informations.find(
        (info) => info.name.toLowerCase() === data.name
      ),
      associates: CountryEntity.getAssociatesFromInformations(
        data.name,
        data.informations
      ),
    };

    return new CountryEntity(props);
  }

  static getAssociatesFromInformations(
    countryName: string,
    informations: CountryProps[]
  ): CountryProps[] | null {
    return informations.filter((i) => i.name.toLowerCase() !== countryName);
  }

  public toJSON() {
    return {
      ...this.props,
    };
  }
}
