import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsRootEffects } from './+state/logs-root.effects';
import { NxModule } from '@nrwl/nx';

@NgModule({
  imports: [CommonModule, NxModule.forRoot()],
  providers: [LogsRootEffects]
})
export class LogsStateModule {}
