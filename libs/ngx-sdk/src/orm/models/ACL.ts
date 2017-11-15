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
import { ACL, ACLInterface, LoopBackFilter } from '../../models';
import { ACLActions } from '../../actions';

export class OrmACL extends OrmBase<ACL | ACLInterface> {
  constructor(protected store: Store<ACL>, protected realTime?: RealTime) {
    super(store, ACL, ACLActions, realTime);
  }
}
