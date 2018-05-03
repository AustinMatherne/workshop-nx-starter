import { Action } from '@ngrx/store';

export enum LogsRootActionTypes {
  LogsRootAction = '[LogsRoot] Action',
  LoadLogsRoot = '[LogsRoot] Load Data',
  LogsRootLoaded = '[LogsRoot] Data Loaded'
}

export class LogsRoot implements Action {
  readonly type = LogsRootActionTypes.LogsRootAction;
}
export class LoadLogsRoot implements Action {
  readonly type = LogsRootActionTypes.LoadLogsRoot;
  constructor(public payload: any) {}
}

export class LogsRootLoaded implements Action {
  readonly type = LogsRootActionTypes.LogsRootLoaded;
  constructor(public payload: any) {}
}

export type LogsRootActions = LogsRoot | LoadLogsRoot | LogsRootLoaded;
