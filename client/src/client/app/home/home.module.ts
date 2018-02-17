import { NgModule, ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ErpSharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AuthService } from '../shared/services/auth.service';
import { ChangePasswordDialog } from './change-password-dialog/change-password-dialog.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SubMenuComponent } from './side-menu/sub-menu.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcumb/breadcrumb.component';
import { HomeEventManager } from './home-manager.service';
import { AccountModule } from '../account/account.module';

@NgModule({
  imports: [ HomeRoutingModule, ErpSharedModule, AccountModule ],
  declarations: [ HomeComponent, NavbarComponent, SideMenuComponent, 
  FooterComponent,SubMenuComponent,BreadcrumbComponent,ChangePasswordDialog ],
  exports: [],
  providers: [ ]
})

export class HomeModule {
    static forRoot(): ModuleWithProviders {
        return {
        	ngModule: HomeModule,
            providers: [HomeEventManager]
        }
    }
}


