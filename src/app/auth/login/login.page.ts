import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { ImageService } from 'src/app/image.service';
import { AuthService } from '../auth.service';


const { Camera, Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private avatar;
  avatarImg: string;
  private platform: Platform;

  constructor(private authService: AuthService, private router: Router, private imageService: ImageService, platform: Platform) {
    this.platform = platform;
  }

  ngOnInit() { }

  async ionViewDidEnter() {
    if (this.avatar) {
      this.imageService.removeImage(this.avatar);
    }
    this.avatar = undefined;
    this.avatarImg = "../../../assets/default-avatar.png";
  }

  async onLogin(email, password) {
    if (!this.avatar) {
      Storage.set({
        key: this.imageService.AVATAR_STORAGE,
        value: JSON.stringify("")
      });
    }
    try {
      const user = await this.authService.login(email.value, password.value);
      if (user) {
        email.value = ""
        password.value = ""
        this.redirectUser(this.authService.isEmailVerified(user));
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  redirectUser(isVerified: boolean) {
    if (isVerified) {
      this.router.navigate(['movies']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }

  public async loadSavedAvatar() {
    const dataList = await Storage.get({ key: this.imageService.AVATAR_STORAGE });
    this.avatar = JSON.parse(dataList.value) || [];
    if (!this.platform.is('hybrid')) {
      const readFile = await Filesystem.readFile({
        path: this.avatar.filepath,
        directory: FilesystemDirectory.Data
      });
      this.avatar.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
    this.avatarImg = this.avatar.webviewPath;
  }

  async getAvatarImage() {
    if (this.avatar) {
      this.imageService.removeImage(this.avatar);
    }
    this.avatar = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    const savedImageFile = await this.imageService.savePicture(this.avatar);
    Storage.set({
      key: this.imageService.AVATAR_STORAGE,
      value: JSON.stringify(savedImageFile)
    });
    await this.loadSavedAvatar();
  }
}
