import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@tuskdesk-suite/data-models';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { ApiConfig } from './api-config';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  private num = 0;
  private _rootUrl = '';

  constructor(@Optional() private apiConfig: ApiConfig, private http: HttpClient) {
    if (apiConfig) {
      this._rootUrl = apiConfig.rootUrl;
    }
  }

  userById(id: number): Observable<User> {
    return this.http.get<User>(`${this._rootUrl}/api/users/${id}`);
  }

  users(searchTerm?: string): Observable<User[]> {
    return this.http.get<User[]>(`${this._rootUrl}/api/users`, { params: searchTerm ? { searchTerm } : null });
  }

  randomString(): Observable<string> {
    const localNum = this.num;
    this.num += 1;

    return interval(1000).pipe(map(() => `${localNum}: ${Math.floor(Math.random() * 11)}`));
  }
}
