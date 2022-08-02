


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
  individualEntity:boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  alias: string;
  title: string;
  note?: string;
  description:string;
  countryId: string;
  countryName: string;
  idiomId: string;
  idionName: string;
  titleId: string;
  titleName: string;
  niupId: string;
  currencyId: string;
  currencyName: string;
  isActive: boolean;
  creationDate: string;
  updateDate: string;
  image?: string;
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
export class Item {
  id:string;
  name:string;
  alias:string;

}

export class DocumentInstances {
  documentIntanceId: string;
  documentType: number;
  documentId: string;
  documentName: string;
  documentTypeId: string;
  documentTypeName: string;
  documentInstanceNumber: string;
  documentInstanceDate: string;
}

export class EntityRoles {
  entityRoleId: string;
  isParticipant: boolean;
  isMain: boolean;
  entityRoleName: string;
  entity:Entity;

}
export class EntityRolesPatch {
  entityRoleId: string;
  isParticipant: boolean;
  isMain: boolean;
  entityId:string;

}

export class Tags {
  tagId: string;
  tagName: string;
}

export class Task{
  id:string;
  note: string;
  startDate: string;
  endDate:string;
  entity: Entity;
}

export interface Instance {
  id:string;
  name: string;
  description: string;
  note: string;
  bulletId:string;
  bulletName: string;
  isImportant:boolean;
  projectId: string;
  projectName: string;
  address:Address;
  entity:Entity;
  item:Item;
  creationDate:string;
  documentInstances:DocumentInstances;
  entityRoles:EntityRoles;
  tags: Tags;
  taks: Task;
}

export class DocumentInstancesPatch{
  documentInstanceId: string;
  documentType: number;
}


export class InstancePatch {

  name:string;
  desciption: string;
  note: string;
  isImportant: boolean;
  projectId: string;
  itemId: string;
  address:Address;
  documentInstances: DocumentInstancesPatch;
  entities:EntityRolesPatch;
  tags: string;
}

