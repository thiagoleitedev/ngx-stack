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
import { StorageFile, StorageFileInterface, LoopBackFilter } from '../../models';
import { StorageFileActions } from '../../actions';

export class OrmStorageFile extends OrmBase<StorageFile | StorageFileInterface> {
  constructor(protected store: Store<StorageFile>, protected realTime?: RealTime) {
    super(store, StorageFile, StorageFileActions, realTime);
  }
}
