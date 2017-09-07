import { Component } from '@angular/core';

import { BerjalanPage } from '../berjalan/berjalan';
import { PerformaPage } from '../performa/performa';
import { TawaranPage } from '../tawaran/tawaran';
import { AkunPage } from '../akun/akun';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TawaranPage;
  tab2Root = BerjalanPage;
  tab3Root = PerformaPage;
  tab4Root = AkunPage;

  constructor() {

  }
}
