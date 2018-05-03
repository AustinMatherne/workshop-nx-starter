import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { LogsBackendModule } from '@tuskdesk-suite/logs-backend';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { LogsRootEffects, logsRootReducer, logsRootInitialState } from '@tuskdesk-suite/logs-state';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot([{ path: '', loadChildren: '@tuskdesk-suite/logs-view#LogsViewModule' }], {
      initialNavigation: 'enabled'
    }),
    StoreModule.forRoot(
      { logsRoot: logsRootReducer },
      { initialState: { logsRoot: logsRootInitialState }, metaReducers: !environment.production ? [storeFreeze] : [] }
    ),
    EffectsModule.forRoot([LogsRootEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    LogsBackendModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
