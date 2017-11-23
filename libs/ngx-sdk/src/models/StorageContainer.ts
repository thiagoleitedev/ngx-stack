/* tslint:disable */
import {
  StorageFile
} from '../index';

declare var Object: any;
export interface StorageContainerInterface {
  "id"?: string;
  "name": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  files?: StorageFile[];
}

export class StorageContainer implements StorageContainerInterface {
  "id": string;
  "name": string;
  "createdAt": Date;
  "updatedAt": Date;
  files: StorageFile[];
  constructor(data?: StorageContainerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `StorageContainer`.
   */
  public static getModelName() {
    return "StorageContainer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of StorageContainer for dynamic purposes.
  **/
  public static factory(data: StorageContainerInterface): StorageContainer{
    return new StorageContainer(data);
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
      name: 'StorageContainer',
      plural: 'StorageContainers',
      path: 'StorageContainers',
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
        files: {
          name: 'files',
          type: 'StorageFile[]',
          model: 'StorageFile',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'container'
        },
      }
    }
  }
}
