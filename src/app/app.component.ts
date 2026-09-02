import { Component, OnInit, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { BottomNavComponent } from './components/navigation/bottom-nav.component';
import { TopBarComponent } from './components/navigation/top-bar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, BottomNavComponent, TopBarComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      @if (isAuthenticated()) {
        <app-top-bar class="sticky top-0 z-40" />
      }
      
      <main class="flex-1 pb-20">
        <router-outlet />
      </main>
      
      @if (isAuthenticated()) {
        <app-bottom-nav class="fixed bottom-0 left-0 right-0 z-40" />
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit {
  isAuthenticated = this.authService.isAuthenticated;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    effect(() => {
      console.log('Estado de autenticación:', this.isAuthenticated());
    });
  }
  
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
