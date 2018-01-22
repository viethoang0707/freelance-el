import { Component , ViewEncapsulation} from '@angular/core';
import { Config } from '../../env.config'

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'etraining-footer',
  templateUrl: 'footer.component.html',
  styleUrls:['footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  version: string;

  constructor() {
    this.version = Config.VERSION;
  }
}
