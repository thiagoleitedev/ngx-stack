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
import { Project, ProjectInterface, LoopBackFilter } from '../../models';
import { ProjectActions } from '../../actions';

export class OrmProject extends OrmBase<Project | ProjectInterface> {
  constructor(protected store: Store<Project>, protected realTime?: RealTime) {
    super(store, Project, ProjectActions, realTime);
  }
}
