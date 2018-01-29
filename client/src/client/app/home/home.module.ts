import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ErpSharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AuthService } from '../shared/services/auth.service';
import { ChangePasswordDialog } from './modals//change-password-dialog/change-password-dialog.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SubMenuComponent } from './side-menu/sub-menu.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcumb/breadcrumb.component';
import { HomeEventManager } from './home-manager.service';


@NgModule({
  imports: [ HomeRoutingModule, ErpSharedModule ],
  declarations: [ HomeComponent, NavbarComponent, SideMenuComponent, 
  FooterComponent,SubMenuComponent,BreadcrumbComponent,ChangePasswordDialog ],
  exports: [],
  providers: [HomeEventManager ]
})
export class HomeModule { 
}



