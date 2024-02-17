import { Component } from '@angular/core';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
 // isAuthenticated$;
  constructor(
    private tokenService: TokenService,
  ) {
  //  this.isAuthenticated$ = this.tokenService.isAuthentication;
  }

}
