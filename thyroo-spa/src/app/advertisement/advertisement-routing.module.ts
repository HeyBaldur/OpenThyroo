import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessComponent } from './business/business.component';
import { CampaignmanagerComponent } from './campaignmanager/campaignmanager.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CreateAdComponent } from './create-ad/create-ad.component';

const routes: Routes = [
  { path: 'business', component: BusinessComponent },
  { path: 'business/campaignmanager', component: CampaignmanagerComponent },
  { path: 'business/campaignmanager/create', component: CreateCampaignComponent },
  { path: 'business/campaignmanager/create/ad', component: CreateAdComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisementRoutingModule { }
