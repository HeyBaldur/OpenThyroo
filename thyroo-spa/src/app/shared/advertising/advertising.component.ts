import { Component, OnInit } from '@angular/core';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { GlobalService } from '../services/global.service';
import { Advertising } from 'src/app/advertisement/interfaces/advertising';
import { AdvertisingService } from 'src/app/advertisement/services/advertising.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css']
})
export class AdvertisingComponent implements OnInit {

  item: Advertising;

  constructor(
    private globalService: GlobalService,
    private advertisingService: AdvertisingService,
    private router: Router) { }

  ngOnInit() {
    this.setViews();
  }

  public setViews(): void {
    this.globalService.getAds().subscribe(res => {
      this.item = res;
      this.advertisingService.setAnalitycs(res.id);
    });
  }

  public clickOnLink(): void {
    this.globalService.getAds().subscribe(res => {
      this.item = res;
      this.advertisingService.setClick(res.id);
    });
  }

}
