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
        this.messageService.add(`UserService : ${message}`);
    }

    private usersUrl = 'api/users';

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl)
            .pipe(
                tap(_ => this.log('fetched users')),
                catchError(this.handleError<User[]>('getUsers', []))
            );
    }

    getUser(id: number): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl)
            .pipe(
                tap(_ => this.log(`fetched user id=${id}`)),
                catchError(this.handleError<User[]>(`getUser id=${id}`))
            );
    }

    updateUser(user: User): Observable<any> {
        return this.http.put(this.usersUrl, user, httpOptions).pipe(
            tap(_ => this.log(`Updated user id= ${user.id}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
            tap((newUser: User) => this.log(`Added user id= ${newUser.id}`)),
            catchError(this.handleError<User>('addUser'))
        );
    }

    deleteUser(user: User | number): Observable<User> {
        const id = typeof user === "number" ? user : user.id;
        const url = `${this.usersUrl}/${id}`;

        return this.http.delete<User>(url, httpOptions).pipe(
            tap(_ => this.log(`Deleted user id= ${id}`)),
            catchError(this.handleError<User>('deleteUser'))
        );
    }

    /* GET Useres whose name contains search term */
    searchUsers(term: string): Observable<User[]> {
        if (!term.trim()) {
            // if not search term, return empty User array.
            return of([]);
        }
        return this.http.get<User[]>(`${this.usersUrl}/?name=${term}`).pipe(
            tap(_ => this.log(`found users matching "${term}"`)),
            catchError(this.handleError<User[]>('searchUser', []))
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
