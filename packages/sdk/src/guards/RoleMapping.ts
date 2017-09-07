/* tslint:disable */
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { RoleMappingApi } from '../services/index';
import { getRoleMappingById } from '../reducers/RoleMapping';
import { RoleMappingActions } from '../actions/RoleMapping';

@Injectable()
export class RoleMappingExistsGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private RoleMapping: RoleMappingApi
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasEntity(route.params['RoleMappingId'] || route.params['id']);
  }

  protected hasEntityInStore(id: string): Observable<boolean> {
    return this.store.select(getRoleMappingById(id))
      .map((entitie) => !!entitie)
      .take(1);
  }

  protected hasEntityInApi(id: string): Observable<boolean> {
    return this.RoleMapping.exists(id)
      .map((response: any) => !!response.exists)
      .catch(() => {
        this.store.dispatch(new RoleMappingActions.guardFail());
        return of(false);
      });
  }

  protected hasEntity(id: string): Observable<boolean> {
    return this.hasEntityInStore(id)
      .switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasEntityInApi(id);
      });
  }
}
