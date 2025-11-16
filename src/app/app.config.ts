import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';

// 1. MUDE A IMPORTAÇÃO (de 'async' para 'animations')
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // 2. MUDE ESTA LINHA (de 'provideAnimationsAsync' para 'provideAnimations')
    provideAnimations(), 
    
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    provideHttpClient(withFetch()) 
  ]
};