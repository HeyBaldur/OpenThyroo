import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() likeCounter: number;
  constructor() { }

  ngOnInit() {
  }

  public like(): void {
    alert('Liked');
  }

  getLikes(): void {
    
  }

}
