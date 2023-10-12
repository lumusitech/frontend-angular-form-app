import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [SideMenuComponent],
})
export class SharedModule {}
