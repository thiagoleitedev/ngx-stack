/* tslint:disable */

import { map, finalize } from 'rxjs/operators'
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { RealTime } from '../../services';
import { createIO } from '../io';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter, toArray, filterById } from '../filter';

import * as models from '../../models';
import { RoleMapping, RoleMappingInterface, LoopBackFilter } from '../../models';
import { RoleMappingActions } from '../../actions';

export class OrmRoleMapping extends OrmBase<RoleMapping | RoleMappingInterface> {
  constructor(protected store: Store<RoleMapping>, protected realTime?: RealTime) {
    super(store, RoleMapping, RoleMappingActions, realTime);
  }

	public getRole(id: any, refresh: any = {}, customHeaders?: Function, meta?: any): Observable<any> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO({}, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return this.store.select<any>(this.model.getModelDefinition().relations.role.model + 's')
        .pipe(
          map((state: any) => state.entities[id]),
          finalize(() => {
            destroyStream$.next(1);
            destroyStream$.complete();
          })
        );
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.getRole(id, refresh, meta));
      }

      return this.store.select<any>(this.model.getModelDefinition().relations.role.model + 's')
        .pipe(map((state: any) => state.entities[id]));
    }
    
  }
  }
