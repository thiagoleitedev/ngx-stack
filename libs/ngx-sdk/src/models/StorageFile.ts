/* tslint:disable */

declare var Object: any;
export interface StorageFileInterface {
  "id"?: string;
  "name": string;
  "type": string;
  "size": number;
  "container"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class StorageFile implements StorageFileInterface {
  "id": string;
  "name": string;
  "type": string;
  "size": number;
  "container": string;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: StorageFileInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `StorageFile`.
   */
  public static getModelName() {
    return "StorageFile";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of StorageFile for dynamic purposes.
  **/
  public static factory(data: StorageFileInterface): StorageFile{
    return new StorageFile(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'StorageFile',
      plural: 'StorageFiles',
      path: 'StorageFiles',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "size": {
          name: 'size',
          type: 'number'
        },
        "container": {
          name: 'container',
          type: 'string'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
