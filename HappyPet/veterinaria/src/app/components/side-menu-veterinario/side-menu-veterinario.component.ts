import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthJWTService } from '../../core/services/auth.service';

@Component({
  selector: 'app-side-menu-veterinario',
  templateUrl: './side-menu-veterinario.component.html',
  styleUrl: './side-menu-veterinario.component.css'
})
export class SideMenuVeterinarioComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  infoUsuario: any = null;
  opcionesPorPerfil: any = [];
  public isOpen = window.innerWidth > 600;
  version = environment.version;
  mobile = window.innerWidth < 600

  location = window.location.href;

  menus: any;

  constructor(
    private router: Router,
    private authService: AuthJWTService,
  ) {}

  ngOnInit(): void {
    this.loadInfoUsuario();
  }

  loadInfoUsuario(): void {
    this.infoUsuario = this.authService.getInfoUsuario();
    this.menus = JSON.parse(localStorage.getItem('menu-veterinario') || 'null');
    if(!this.menus){
      this.router.navigate(['auth/login']);
      return;
    }

    if (!this.infoUsuario) {
      this.infoUsuario = this.authService.getInfoUsuario();
      this.router.navigate(['/']);
    }
  }

  closePanel(sidenav: MatSidenav) {
    if (sidenav.mode === 'over') {
      sidenav.close();
    }
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  onNavigateTo(url: string): void {
    if (window.innerWidth <= 600) {
      this.isOpen = false;
    }

    if (location.href.endsWith(url)) {
      location.reload();
    }

    this.location = url;
    this.router.navigate([url]);
  }

  onVerPerfil(): void {}
  onChangePassword(): void {}
  onLogout(): void {
    this.authService.logout();
  }

  onLogin(): void {
    this.router.navigate(['auth/login']);
  }
}

