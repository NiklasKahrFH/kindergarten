import { Component, OnInit } from '@angular/core';
import { BackendService } from './shared/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kindergardenApp';
  isShown: boolean = true;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getKindergardens();

    setTimeout(() => {
      this.isShown = false;
    }, 1400);

  }

  public checkSpinner() {
    if (!this.isShown) {
      this.isShown = true;
    }
    this.ngOnInit();
  }
}
