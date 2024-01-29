import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ScreensPageRoutingModule } from './screens-routing.module';

import { ScreensPage } from './screens.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyHeaderComponent } from './shared/my-header/my-header.component';
import { ProviderService } from '../services/provider.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreensPageRoutingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    ScreensPage,
    DashboardComponent,
    MyHeaderComponent,
    CourseDetailsComponent,
    WishListComponent,
    CartComponent,
    ProfileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ProviderService,
    Storage]
})
export class ScreensPageModule { }
