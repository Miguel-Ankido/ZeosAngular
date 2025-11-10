import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

// 1. IMPORTE O 'provideHttpClient' E O 'withFetch'
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    
    // 2. ADICIONE O 'withFetch()' AQUI
    provideHttpClient(withFetch()) 
  ]
};