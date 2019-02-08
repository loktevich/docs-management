import { Component } from '@angular/core';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private storageService: StorageService) { }

  emptyStorage(): void {
    this.storageService.emptyStorage();
  }

}
