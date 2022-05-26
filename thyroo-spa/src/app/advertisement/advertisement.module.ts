import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business/business.component';
import { CampaignmanagerComponent } from './campaignmanager/campaignmanager.component';
import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    AdvertisementRoutingModule,
    SharedModule,
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  declarations: [
    BusinessComponent,
    CampaignmanagerComponent,
    CreateCampaignComponent,
    CreateAdComponent
  ]
})
export class AdvertisementModule { }
