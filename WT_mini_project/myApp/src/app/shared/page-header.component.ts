import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  standalone: true,
  template: `
    <div class="page-head">
      <div class="page-head-inner">
        <h1>{{title}}</h1>
        <p>{{subtitle}}</p>
      </div>
    </div>
  `
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
