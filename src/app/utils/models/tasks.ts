

export interface Tasks {
  id: string;
  address: Address;
  entity: Entity;


}


export interface Contacts {
  contactId : string;
  contactNamme: string;
  contactTypeId : string;
  contactTypeName: string;
  entity:Entity;
  id : string;
  value: string;
}


export class Entity {
  id: string;
  firstName: string;
  lastName: string;
  alias: string;
  title: string;
}
export class Address {
  addressLine1: string;
  addressLine2: string
  addressLine3: string
  addressTypeId: string
  addressTypeName: string
  cityId: string
  cityName: string
  continentId: string
  continentName: string
  countryId: string
  countryName: string
  latitude: string
  longitude: string
  postalCode: string
  stateId: string
  stateName: string
}


