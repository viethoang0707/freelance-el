import { Component , ViewEncapsulation} from '@angular/core';
import { Config } from '../../env.config'

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls:['footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  private version: string;

  constructor() {
    this.version = Config.VERSION;
  }
}
