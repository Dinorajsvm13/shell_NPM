import { Component } from '@angular/core';

@Component({
  selector: 'shell-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nx-angular';

  ngOnInit() {
    const text = 'Angular';
    const reverse = this.reverseString(text);
    console.log(reverse);
  }

  reverseString(text: string) {
    let reversed: string = '';
    for (let i = 0; i < text.length; i++) {
      reversed += text[text.length -i - 1];
    }
    return reversed;
  }
}
