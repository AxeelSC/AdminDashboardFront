import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SVG_ICONS, IconName } from '../../../svg-icons/svg-icons';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-brand-icon.component.html',
  styleUrl: './svg-brand-icon.component.scss',
})
export class SvgBrandIconComponent {
  @Input() name: IconName = 'star';
  @Input() size: number = 24;
  @Input() color: string = 'currentColor';
  @Input() customClass: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  get iconSvg(): SafeHtml {
    const svg = SVG_ICONS[this.name] || SVG_ICONS.star;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
