
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppComponent }         from './app/app.component';

import { KeycloakService } from './app/security/keycloak.service';

KeycloakService.init()
   .then(() => platformBrowserDynamic().bootstrapModule(AppModule))
   .catch(e => window.location.reload());
   