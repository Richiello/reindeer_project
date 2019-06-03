import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, name: 'Mr. Nice', icon: 'owl' },
      { id: 12, name: 'Narco', icon: 'fish' },
      { id: 13, name: 'Bombasto', icon: 'dog' },
      { id: 14, name: 'Celeritas', icon: 'bird' },
      { id: 15, name: 'Magneta', icon: 'owl' },
      { id: 16, name: 'RubberMan', icon: 'owl' },
      { id: 17, name: 'Dynama', icon: 'owl' },
      { id: 18, name: 'Dr IQ', icon: 'owl' },
      { id: 19, name: 'Magma', icon: 'owl' },
      { id: 20, name: 'Tornado', icon: 'owl' }
    ];
    return { users }
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
