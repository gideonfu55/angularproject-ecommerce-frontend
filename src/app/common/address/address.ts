export class Address {

  street: string;
  city: string;
  state: string;
  country: string;
  postCode: string;

  constructor(
    street: string,
    city: string,
    state: string,
    country: string,
    postCode: string
) {
    this.street = street
    this.city = city
    this.state = state
    this.country = country
    this.postCode = postCode
  }

}
