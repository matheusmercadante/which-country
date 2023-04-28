import { CountryProps } from './country.entity';

export class CountryResponseDTO {
  // put this if we want create a props whitelist
  private props: CountryProps;

  constructor(props: CountryProps) {
    this.props = props;
  }

  toJSON(): CountryProps {
    return {
      ...this.props,
    };
  }
}
