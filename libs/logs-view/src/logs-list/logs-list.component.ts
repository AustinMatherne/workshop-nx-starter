import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventLog } from '@tuskdesk-suite/data-models';
import { LogService } from '@tuskdesk-suite/logs-backend';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss']
})
export class LogsListComponent implements OnInit {
  logs: Observable<EventLog[]>;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logs = this.logService.logs();
  }
}
