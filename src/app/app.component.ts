import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';
import { Observable } from 'rxjs';
import { ImageService } from './image.service';
import { Storage, Filesystem, FilesystemDirectory } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  user$: Observable<User> = this.authService.afAuth.user;
  private avatar;
  avatarImg: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private imageService: ImageService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.user$.subscribe(async user => {
      await this.loadSavedAvatar();
    })
  }

  async onLogout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  public async loadSavedAvatar() {
    const dataList = await Storage.get({ key: this.imageService.AVATAR_STORAGE });
    this.avatar = JSON.parse(dataList.value) || [];
    if (this.avatar.length === 0) {
      this.avatarImg = "../assets/default-avatar.png";
      return;
    }
    if (!this.platform.is('hybrid')) {
      const readFile = await Filesystem.readFile({
        path: this.avatar.filepath,
        directory: FilesystemDirectory.Data
      });
      this.avatar.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
    this.avatarImg = this.avatar.webviewPath;
  }
}
