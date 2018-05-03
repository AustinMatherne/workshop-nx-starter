import { Action } from '@ngrx/store';
import { LogsRootActions, LogsRootActionTypes } from './logs-root.actions';
import { EventLog } from '@tuskdesk-suite/data-models';

/**
 * Interface for the 'LogsRoot' data used in
 *  - LogsRootState, and
 *  - logsRootReducer
 */
export interface LogsRootData {
  eventLogs: EventLog[];
}

/**
 * Interface to the part of the Store containing LogsRootState
 * and other information related to LogsRootData.
 */
export interface LogsRootState {
  readonly logsRoot: LogsRootData;
}

export const initialState: LogsRootData = {
  eventLogs: []
};

export function logsRootReducer(state = initialState, action: LogsRootActions): LogsRootData {
  switch (action.type) {
    case LogsRootActionTypes.LogsRootAction:
      return state;

    case LogsRootActionTypes.LogsRootLoaded: {
      return { ...state, eventLogs: action.payload };
    }

    default:
      return state;
  }
}
