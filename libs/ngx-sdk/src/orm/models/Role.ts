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
import { Role, RoleInterface, LoopBackFilter } from '../../models';
import { RoleActions } from '../../actions';

export class OrmRole extends OrmBase<Role | RoleInterface> {
  constructor(protected store: Store<Role>, protected realTime?: RealTime) {
    super(store, Role, RoleActions, realTime);
  }

	public findByIdPrincipals(id: any, fk: any, customHeaders?: Function, meta?: any): Observable<any> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO({}, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return this.store.select<any>(this.model.getModelDefinition().relations.principals.model + 's')
        .pipe(
          map((state: any) => state.entities[fk]),
          finalize(() => {
            destroyStream$.next(1);
            destroyStream$.complete();
          })
        );
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.findByIdPrincipals(id, fk, meta));
      }

      return this.store.select<any>(this.model.getModelDefinition().relations.principals.model + 's')
        .pipe(map((state: any) => state.entities[fk]));
    }
    
  }
  
	public destroyByIdPrincipals(id: any, fk: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdPrincipals(id, fk, meta));
  }
  
	public updateByIdPrincipals(id: any, fk: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdPrincipals(id, fk, data, meta));
  }
  
	public getPrincipals(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, meta?: any): Observable<any[]> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO(filter, this.store, destroyStream$, models[this.model.getModelDefinition().relations.principals.model], this.realTime, meta);

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.principals.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'principals', Role)),
            finalize(() => {
              destroyStream$.next(1);
              destroyStream$.complete();
            })
          )
        , filter, this.store, models[this.model.getModelDefinition().relations.principals.model]);
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.getPrincipals(id, filter, meta));
      }

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.principals.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'principals', Role))
          )
        , filter, this.store, models[this.model.getModelDefinition().relations.principals.model]);
    }
    
  }
	
	public createPrincipals(id: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.createPrincipals(id, data, meta));
  }
  
	public deletePrincipals(id: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.deletePrincipals(id, meta));
  }
  
	public createManyPrincipals(id: any, data: any[] = [], customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.createManyPrincipals(id, data, meta));
  }
  }
