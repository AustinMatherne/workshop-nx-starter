import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { LogsRootEffects } from './logs-root.effects';
import { LoadLogsRoot, LogsRootLoaded } from './logs-root.actions';

import { Observable } from 'rxjs/Observable';

describe('LogsRootEffects', () => {
  let actions$: Observable<any>;
  let effects$: LogsRootEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [LogsRootEffects, DataPersistence, provideMockActions(() => actions$)]
    });

    effects$ = TestBed.get(LogsRootEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: new LoadLogsRoot({}) });
      expect(effects$.loadLogsRoot$).toBeObservable(hot('-a-|', { a: new LogsRootLoaded({}) }));
    });
  });
});
