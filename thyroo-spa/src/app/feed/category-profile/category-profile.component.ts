import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from '../interfaces/iCategory';

@Component({
  selector: 'app-category-profile',
  templateUrl: './category-profile.component.html',
  styleUrls: ['./category-profile.component.css']
})
export class CategoryProfileComponent implements OnInit {

  @Input() categoryInfo: ICategory;
  constructor() { }

  ngOnInit() {
  }

}
