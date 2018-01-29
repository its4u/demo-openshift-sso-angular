import { Injectable } from '@angular/core';


declare var Keycloak: any;

@Injectable()
export class KeycloakService {

    private static keycloakAuth : any = new Keycloak('./app/security/keycloak.json');

    static auth : any = {};

    static init() : Promise<any>{
        KeycloakService.auth.loggedIn = false;
        KeycloakService.auth.sessionExpired = false;

        return new Promise((resolve,reject)=>{
            KeycloakService.keycloakAuth.init({ onLoad: 'login-required' })
                .success( () => {
                    console.log("KeycloakService: authentification OK");
                    KeycloakService.auth.loggedIn = true;
                    KeycloakService.auth.authz = KeycloakService.keycloakAuth;
                    KeycloakService.auth.logoutUrl = KeycloakService.keycloakAuth.createLogoutUrl();
                    resolve(null);
                })
                .error(()=> {
                    console.log("KeycloakService: authentification KO");
                    reject(null);
                });
        });
    }

    loadUserInfo() : any {
       return KeycloakService.keycloakAuth.loadUserInfo();
    }

    loadUserProfile() : any {
        return KeycloakService.keycloakAuth.loadUserProfile();
    }

    logout(){
        KeycloakService.auth.loggedIn = false;
        KeycloakService.auth.sessionExpired = false;
        KeycloakService.auth.authz = null;

        window.location.href = KeycloakService.auth.logoutUrl;
    }

    getToken(): Promise<string> {
        return new Promise<string>((resolve,reject)=>{
            if (KeycloakService.auth.authz.token) {
                KeycloakService.auth.authz.updateToken(5).success(function() {
                    console.log("KeycloakService: getToken OK");
                    resolve(<string>KeycloakService.auth.authz.token);
                })
                .error(function() {
                    console.log("KeycloakService: getToken KO");
                    KeycloakService.auth.sessionExpired = true;
                    reject(null);
                });
            }
        });
    }
}
