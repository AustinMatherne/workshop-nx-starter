import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LogsRootActionTypes, LoadLogsRoot, LogsRootLoaded } from './logs-root.actions';
import { LogsRootState } from './logs-root.reducer';
import { DataPersistence } from '@nrwl/nx';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { LogService } from '@tuskdesk-suite/logs-backend';

@Injectable()
export class LogsRootEffects {
  @Effect()
  effect$ = this.actions$.ofType(LogsRootActionTypes.LoadLogsRoot).pipe(
    mergeMap(action => {
      return this.logsService.logs().pipe(map(logs => new LogsRootLoaded(logs)), catchError(_ => of(null)));
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<LogsRootState>,
    private logsService: LogService
  ) {}
}
