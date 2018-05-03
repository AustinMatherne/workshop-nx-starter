import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { EventLog } from '@tuskdesk-suite/data-models';
import { LoadLogsRoot, LogsRootState } from '@tuskdesk-suite/logs-state';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss']
})
export class LogsListComponent implements OnInit {
  logs$: Observable<EventLog[]> = this.store.select(s => s.logsRoot.eventLogs);

  constructor(private store: Store<LogsRootState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadLogsRoot());
  }
}
