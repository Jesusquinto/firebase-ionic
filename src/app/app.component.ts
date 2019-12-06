import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  public opionSelected: string;
  public user: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private servicio: AuthService
  ) {
    this.appPages = [
    /*   {
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home',
        color: 'light'
      }, */
      {
        title: 'Información',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline',
        color: 'light'
      },

      {
        title: 'Configuración',
        url: '/settings',
        direct: 'forward',
        icon: 'cog',
        color: 'light'
      }
    ];

    this.initializeApp();
  }




  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let user = this.servicio.isAuth().subscribe(user =>{
        this.user = user;
      });
      });

  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }




}
