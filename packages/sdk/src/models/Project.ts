/* tslint:disable */

declare var Object: any;
export interface ProjectInterface {
  "name": string;
  "description"?: string;
  "salesHandoff"?: string;
  "clientKickoff"?: string;
  "devKickoff"?: string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Project implements ProjectInterface {
  "name": string;
  "description": string;
  "salesHandoff": string;
  "clientKickoff": string;
  "devKickoff": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: ProjectInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Project`.
   */
  public static getModelName() {
    return "Project";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Project for dynamic purposes.
  **/
  public static factory(data: ProjectInterface): Project{
    return new Project(data);
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
      name: 'Project',
      plural: 'Projects',
      path: 'Projects',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "salesHandoff": {
          name: 'salesHandoff',
          type: 'string'
        },
        "clientKickoff": {
          name: 'clientKickoff',
          type: 'string'
        },
        "devKickoff": {
          name: 'devKickoff',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
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
