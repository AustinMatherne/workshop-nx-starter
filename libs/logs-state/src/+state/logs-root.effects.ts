import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LogsRootActions, LogsRootActionTypes, LoadLogsRoot, LogsRootLoaded } from './logs-root.actions';
import { LogsRootState } from './logs-root.reducer';
import { DataPersistence } from '@nrwl/nx';

@Injectable()
export class LogsRootEffects {
  @Effect() effect$ = this.actions$.ofType(LogsRootActionTypes.LogsRootAction);

  @Effect()
  loadLogsRoot$ = this.dataPersistence.fetch(LogsRootActionTypes.LoadLogsRoot, {
    run: (action: LoadLogsRoot, state: LogsRootState) => {
      return new LogsRootLoaded(state);
    },

    onError: (action: LoadLogsRoot, error) => {
      console.error('Error', error);
    }
  });

  constructor(private actions$: Actions, private dataPersistence: DataPersistence<LogsRootState>) {}
}
