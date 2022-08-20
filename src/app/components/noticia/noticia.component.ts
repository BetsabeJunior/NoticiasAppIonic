import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;

  constructor(private actionCtrl: ActionSheetController, private iab: InAppBrowser, private storageService: StorageService, private socialSharing: SocialSharing) { }

  ngOnInit() { }

  abrirNoticias() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {
    const noticiasEnFavorito = this.storageService.noticiasEnFavorito(this.noticia);
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share-social-outline',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, {
        text: noticiasEnFavorito ? 'Eliminar de favoritos' : 'Agregar a favorito',
        icon: noticiasEnFavorito ? 'star-half-outline' : 'star-outline',
        handler: () => {
          this.storageService.saveRemoveNoticia(this.noticia);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
