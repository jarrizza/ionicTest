import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loading = null;
  refreshing = false;
  ready = false;
  isIOS = false;
  platforms = [];
  buttonClass = 'main-button';
  buttonColor = 'primary';

  constructor(public plt: Platform, public loadingController: LoadingController) {
   // this.plt.ready().then(this.showStuff);
    this.isIOS = this.plt.is('ios');
    if (this.isIOS) {
      this.buttonClass = 'wide-button';
      this.buttonColor = 'tertiary';
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 100000          // timeout duration
    });

    await this.loading.present();
  }

  async dataSuccessfullyLoading() {
    await this.loading.dismiss();
    this.loading = null;

    console.log('Loading dismissed over here!');
  }

  showStuff() {
    this.ready = true;
    this.platforms = this.plt.platforms();
  }

  onStartLoading() {
    this.loading = this.presentLoading();
    setTimeout(
        () => {
          if (this.loading) {
            this.loading = this.dataSuccessfullyLoading();
            }
          }, 2000  // actual time to load (mocked)
    );
  }

  doRefresh(event) {
    this.refreshing = true;
    setTimeout(() => {
      this.refreshing = false;
      event.target.complete();
    }, 2000);  // actual time to refresh (mocked)
  }

}
