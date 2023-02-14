import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { StringifyOptions } from "querystring";

export interface Tasks {
  id: string;
  address: Address;
  bulletName: string;
  entity: Entity;
  item: Items;
  currentStatus:CurrentStatus[];
  estimatedEndDate: string;
  estimatedStartDate : string;
  fileFields: FileFields;





}



export interface Items {
  children: Children[];
  description: string;
  id: string;
  name: string;
  note: string;
  parentId: string;
  parentName: string;
  image: string;
}


export class Children {
  description: string;
  id: string;
  name: string;
  note: string;
  parentId: string;
  parentName: string;

}

export interface PaymentMethods{
  id: string;
  name: string;
  description:string;
  note:string;

}

export interface Contacts {
  contactId: string;
  contactName: string;
  contactTypeId: string;
  contactTypeName: string;
  entity: Entity;
  id: string;
  value: string;
}




export class Entity {
  id: string;
  individualEntity: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  alias: string;
  title: string;
  note?: string;
  description: string;
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
  iconCheck: boolean;

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
  id: string;
  name: string;
  alias: string;

}

export class DocumentInstances {
  documentInstanceId: string;
  documentType: number;
  documentId: string;
  documentName: string;
  documentTypeId: string;
  documentTypeName: string;
  documentInstanceNumber: string;
  documentInstanceDate: string;
}

export class DocumentsInstances1{
  documentInstanceId : string;
  documentType: number;
}


export interface IdentityDocuments {
  entity: Entity;
  identityDocumentId: string;
  identityDocumentName: string;
  identityDocumentTypeId: string;
  identityDocumentTypeName: string;
  countryId: string;
  countryName: string;
  expiryDate: string;
  issueDate: string;
  value: string;
}

export class EntityRoles {
  entityRoleId: string;
  isParticipant: boolean;
  isMain: boolean;
  entityRoleName: string;
  entity: Entity;

}
export class EntityRolesPatch {
  entityRoleId: string;
  isParticipant: boolean;
  isMain: boolean;
  entityId: string;

}

export class FormInstances {
  formInstances :string;
}


export class InstanceNotes {
  name: string;
  description: string;
  note: string;
  isImportant: boolean;
  projectId: string;
  itemId: string;
  address:Address;
  documentInstances1: DocumentsInstances1[];
  entities : EntityRolesPatch[];
   tags: Tags[];
   estimatedStartDate: string;
   startDate: string;
   estimatedEndDate: string;
    endDate:string;
    formInstances : FormInstances[];
}

export class Tags {
  tagId: string;
  tagName: string;
}


export class Classification {
  id: string;
  firstName: string;
  lastName: string;
  alias: string;
  countryId: string;
  countryName: string;
  vatNumber: string;
  mainContact:string;
  email:string;
}

export interface Instance {
  id: string;
  name: string;
  description: string;
  note: string;
  bulletId: string;
  currentStatus: CurrentStatus[];
  bulletName: string;
  isImportant: boolean;
  projectId: string;
  projectName: string;
  address: Address;
  entity: Entity;
  item: Item;
  creationDate: string;
  documentInstances: DocumentInstances[];
  estimatedStartDate: string;
  estimatedEndDate:string;
  startDate:string;
  endDate:string;
  entityRoles: EntityRoles[];
  tags: Tags[];
  tasks: Task[];
  statusHistory : StatusHistory[];
  fileFields: FileFields[];
}

export class Task {
  id: string;
  note: string;
  startDate: string;
  endDate: string;
  entity: Entity;
}

export class FileFields {
  fieldId: string;
  fileId: string;
  fileName : string;
}




export class StatusHistory {
  id:string;
  note:string;
  statusId: string;
  statusName:string;
  statusStartDate:string;
  statusType: number;
}


export class TypesState {
  bulletTypeName: string;
  inicialStatusType: number;
  inicialStatusName: string;
  id: string;
  bulletTypeId:string;
  name: string;
  description: string;
  note: string;
  initialStatusId: string;
  currentStatus:CurrentStatus[];
}

export class CurrentStatus{
  id: string;
  name:string;
  type:number;
}


export class DocumentInstancesPatch {
  documentInstanceId: string;
  documentType: number;
}



export class SubTypesState{
  entityRoles: string;
  tags: string;
  statusFlows:StatusFlows[];
}

export class StatusFlows{
  originStatusName:string;
  originStatusType:number;
  destinyStatusName:string;
  destinyStatusType: number;
  originStatusId: string;
  destinyStatusId: string;

}


export class InstancePatch {

  name: string;
  description: string;
  note: string;
  isImportant: boolean;
  projectId: string;
  itemId: string;
  address: Address;
  documentInstances: DocumentInstancesPatch[];
  entities: EntityRolesPatch[];
  tags: Tags[];
  bulletName?: string;
  estimatedStartDate:string;
  startDate:string;
  estimatedEndDate: string;
  endDate:string;
  constructor(instance: Instance) {

    this.name = instance.name ?? null;
    this.description = instance.description ?? null;
    this.note = instance.note ?? null;
    this.isImportant = instance.isImportant ?? false;
    this.projectId = instance.projectId ?? null;
    this.itemId = instance.item?.id ?? null;
    this.address = instance.address;
    this.estimatedStartDate = instance.estimatedStartDate;
    this.estimatedEndDate = instance.estimatedEndDate;
    this.startDate = instance.startDate;
    this.endDate = instance.endDate;
    this.documentInstances = (instance.documentInstances ?? []).map(elem => {
      return {
        documentInstanceId: elem.documentInstanceId,
        documentType: elem.documentType
      }
    }) ;
    this.entities = (instance.entityRoles ?? []).map(elem => {
      return {
        entityRoleId: elem.entityRoleId,
        isParticipant: elem.isParticipant,
        isMain: elem.isMain,
        entityId: elem.entity.id
      }
    });
    this.tags = instance.tags != null ? (instance.tags ?? []).map(elem => {
      return {
        tagId: elem.tagId,
        tagName: elem.tagName
      }
    }) : null;
  }

}


