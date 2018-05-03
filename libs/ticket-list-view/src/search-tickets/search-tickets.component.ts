import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TicketService, UserService } from '@tuskdesk-suite/backend';
import { User } from '@tuskdesk-suite/data-models';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-tickets',
  templateUrl: './search-tickets.component.html',
  styleUrls: ['./search-tickets.component.scss']
})
export class SearchTicketsComponent implements OnInit {
  searchTerm = new FormControl();
  assignedToUser = new FormControl();
  searchResults$: Observable<SearchResult[]>;
  users: User[] = [];
  subscription: Subscription;

  constructor(private ticketService: TicketService, private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.assignedToUser.valueChanges
      .pipe(switchMap(val => this.userService.users(val)))
      .subscribe(users => {
        this.users = users;
      });
  }

  setAssignedToUser(value) {
    this.assignedToUser.patchValue(value, { emitEvent: false });
  }

  submit() {}
}

interface SearchResult {
  id: number;
  message: string;
  status: string;
}
