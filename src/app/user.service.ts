import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { USERS } from './mock-users';
import { MessageService } from './message.service'

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private messageService: MessageService) { }

    getUsers(): Observable<User[]> {
        this.messageService.add('UserService: fetched user')
        return of(USERS);
    }

    getUser(id: number): Observable<User[]> {
        this.messageService.add(`UserService: fetched user id=${id}`)
        return of(USERS.filter(user => user.id === id));
    }
}
