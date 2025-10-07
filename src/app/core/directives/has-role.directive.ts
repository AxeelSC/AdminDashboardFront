import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({ selector: '[appHasRole]' })
export class HasRoleDirective {
  private roles: string[] = [];
  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private auth: AuthService
  ) {}

  @Input() set appHasRole(val: string[]) {
    this.roles = val ?? [];
    this.render();
  }

  private render() {
    const userRoles = this.auth.user?.roles ?? [];
    this.vcr.clear();
    if (this.roles.length === 0 || userRoles.some((r) => this.roles.includes(r))) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
}
