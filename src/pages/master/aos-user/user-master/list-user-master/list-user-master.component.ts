import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { PaginatorComponent } from '../../../../../components/paginator/paginator.component';
import { environment } from '../../../../../environments/environment.development';
import { User } from '../../../../../interfaces/user';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-list-user-master',
  templateUrl: './list-user-master.component.html',
  styleUrl: './list-user-master.component.scss',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    PaginatorComponent,
    MatSelectModule,
    MatIconButton,
    MatDialogModule,
    CommonModule,
  ],
})
export class ListUserMasterComponent implements OnInit {
  items: User[] = [];
  rows: number[] = [5, 10, 20];
  limit = signal(this.rows[0]);
  offset = signal(0);
  size: number = 0;
  page: number = 0;
  records: number = 0;
  searchTxt!: string;
  from = computed(() => this.offset() * this.limit() + 1);
  to = computed(() => this.offset() * this.limit() + this.limit());

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.getUsers(this.limit(), this.offset()).subscribe(
      (res) => {
        this.items = res.content;
        this.size = +res.totalPages;
        this.records = +res.totalElements;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelectRow(event: any) {
    this.limit.set(+event.target.value);
    this.loadData();
  }

  navigate(targetPage: any) {
    this.page = targetPage;
    this.offset.set(targetPage - 1);
    this.loadData();
  }

  navigateToCreateUser() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.user,
      environment.create,
    ]);
  }

  viewUser(id: number) {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.user,
      environment.view,
      id,
    ]);
  }

  editUser(id: number) {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.user,
      environment.edit,
      id,
    ]);
  }

  deleteCategory(id: number) {
    this.userService.deleteUser(id).subscribe(
      (res) => {
        console.log(res);
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
