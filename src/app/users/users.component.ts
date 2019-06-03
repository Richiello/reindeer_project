import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { UserService } from '../user.service';

//three metadata properties: selector, templateUrl, styleUrls
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

    selectedUser: User;
    users: User[];

    constructor(private userService: UserService) { };

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers()
            .subscribe(users => this.users = users)
    }
}