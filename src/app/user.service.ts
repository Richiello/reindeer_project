import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
// import { USERS } from './mock-users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service'
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    private usersUrl = 'api/users';

    getUsers(): Observable<User[]> {
        // const url = `${this.usersUrl}/${id}`;
        return this.http.get<User[]>(this.usersUrl)
            .pipe(
                tap(_ => this.log('fetched users')),
                catchError(this.handleError<User[]>('getUsers', []))
            );
    }


    updateUser(user: User): Observable<any> {
        return this.http.put(this.usersUrl, user, httpOptions).pipe(
            tap(_ => this.log(`Updated hero id= ${user.id}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error)
            this.log(`${operation} failed: ${error.message}`)
            return of(result as T)
        }
    }
}
