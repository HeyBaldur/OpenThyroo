import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-options',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.css']
})
export class PostOptionsComponent implements OnInit {

  @Input() postId: string;
  constructor() { }

  ngOnInit() {
  }
}
