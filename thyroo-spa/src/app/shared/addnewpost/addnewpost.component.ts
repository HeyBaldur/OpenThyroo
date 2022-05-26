import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addnewpost',
  templateUrl: './addnewpost.component.html',
  styleUrls: ['./addnewpost.component.css']
})
export class AddnewpostComponent implements OnInit {

  // Public variables
  addPost: FormGroup;
  post: FormControl;

  constructor(
    private fireStore: AngularFirestore,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }
}
