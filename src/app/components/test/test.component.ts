import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  toggleDarkTheme(): void {
    document.getElementById("test")!.classList.toggle('dark-theme');
  }
}
