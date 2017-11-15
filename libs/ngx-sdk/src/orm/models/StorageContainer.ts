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
import { StorageContainer, StorageContainerInterface, LoopBackFilter } from '../../models';
import { StorageContainerActions } from '../../actions';

export class OrmStorageContainer extends OrmBase<StorageContainer | StorageContainerInterface> {
  constructor(protected store: Store<StorageContainer>, protected realTime?: RealTime) {
    super(store, StorageContainer, StorageContainerActions, realTime);
  }

	public findByIdFiles(id: any, fk: any, customHeaders?: Function, meta?: any): Observable<any> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO({}, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return this.store.select<any>(this.model.getModelDefinition().relations.files.model + 's')
        .pipe(
          map((state: any) => state.entities[fk]),
          finalize(() => {
            destroyStream$.next(1);
            destroyStream$.complete();
          })
        );
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.findByIdFiles(id, fk, meta));
      }

      return this.store.select<any>(this.model.getModelDefinition().relations.files.model + 's')
        .pipe(map((state: any) => state.entities[fk]));
    }
    
  }
  
	public destroyByIdFiles(id: any, fk: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdFiles(id, fk, meta));
  }
  
	public updateByIdFiles(id: any, fk: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdFiles(id, fk, data, meta));
  }
  
	public getFiles(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, meta?: any): Observable<any[]> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO(filter, this.store, destroyStream$, models[this.model.getModelDefinition().relations.files.model], this.realTime, meta);

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.files.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'files', StorageContainer)),
            finalize(() => {
              destroyStream$.next(1);
              destroyStream$.complete();
            })
          )
        , filter, this.store, models[this.model.getModelDefinition().relations.files.model]);
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.getFiles(id, filter, meta));
      }

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.files.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'files', StorageContainer))
          )
        , filter, this.store, models[this.model.getModelDefinition().relations.files.model]);
    }
    
  }
	
	public createFiles(id: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.createFiles(id, data, meta));
  }
  
	public deleteFiles(id: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.deleteFiles(id, meta));
  }
  
	public createManyFiles(id: any, data: any[] = [], customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.createManyFiles(id, data, meta));
  }
  }
