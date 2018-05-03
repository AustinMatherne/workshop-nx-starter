import { Action } from '@ngrx/store';
import { EventLog } from '@tuskdesk-suite/data-models';

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
}

export class LogsRootLoaded implements Action {
  readonly type = LogsRootActionTypes.LogsRootLoaded;
  constructor(public payload: EventLog[]) {}
}

export type LogsRootActions = LogsRoot | LoadLogsRoot | LogsRootLoaded;
