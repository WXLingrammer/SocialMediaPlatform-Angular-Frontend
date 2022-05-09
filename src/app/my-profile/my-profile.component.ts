import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user: User = new User();
  id!: number;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data=>{
      this.user = data;
    });
  }

  onSubmit(){
    this.userService.updateUserById(this.id, this.user).subscribe(data=>{
      localStorage.setItem('name', this.user.name);
      this.backToHome();
    });
  }

  backToHome(){
    this.router.navigate(['home']);
  }

}
