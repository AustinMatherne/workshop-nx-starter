import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { logsRootReducer, initialState as logsRootInitialState } from './+state/logs-root.reducer';
import { LogsRootEffects } from './+state/logs-root.effects';
import { NxModule } from '@nrwl/nx';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

@NgModule({
  imports: [CommonModule, NxModule.forRoot(), StoreModule.forRoot(
  { logsRoot: logsRootReducer },
  {
    initialState : { logsRoot : logsRootInitialState },
    metaReducers : !environment.production ? [storeFreeze] : []
  }
), EffectsModule.forRoot([LogsRootEffects]), !environment.production ? StoreDevtoolsModule.instrument() : []],
  providers: [LogsRootEffects]
})
export class LogsStateModule {}
