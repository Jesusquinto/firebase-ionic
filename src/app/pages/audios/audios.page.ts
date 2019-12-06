import { Component,NgZone, ViewChild } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController,Platform, IonItemSliding } from '@ionic/angular';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';


import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { AudioInterface } from 'src/app/interfaces/audios';



@Component({
  selector: 'app-audios',
  templateUrl: './audios.page.html',
  styleUrls: ['./audios.page.scss']
})
export class AudiosPage {

  @ViewChild('slide') slide: IonItemSliding;
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';

  nombreClase: string;

  duration: number;
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  recordDuration: number;


  uploadPercent: Observable<number>;
  urlAudio: Observable<string>;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,

    private media: Media,
    private file: File,
    public platform: Platform, private ngZone: NgZone,
    private base64: Base64,
    private storage: AngularFireStorage,
    private servicio : DataApiService,
    private authService: AuthService

  ) {
    this.nombreClase = "";
    this.recordDuration = 0;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.getAudioList();
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }


  startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.mp3';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    let duracion = 0;
    let flag = false;
    let loop = () => {
      if(flag == false){
        setTimeout( () => {
          this.recordDuration +=1;
          duracion +=1;
          console.log(duracion);
          loop();
      }, 1000);
      }
  } 
  loop();

   this.audio.onSuccess.subscribe(r =>{
     console.log("termino - duracion:", duracion); this.duration = duracion; flag = true; 
   })

    this.recording = true;
  }


  stopRecord() {
    
    this.audio.stopRecord();

    setTimeout( () => {
      
      console.log("hey lo que llega", this.duration);

      let d = Number(this.duration+1);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
      let tiempo;
      if(h <=0){          
        tiempo = m.toString().padStart(2, '0') + ':' + 
                 s.toString().padStart(2, '0');
      }else{          
        tiempo = h.toString().padStart(2, '0') + ':' + 
        m.toString().padStart(2, '0') + ':' + 
        s.toString().padStart(2, '0');     
      }

      this.audio.release();
      let data = { filename: this.fileName, duration: tiempo, isPlay: false, status: 0, seconds: this.duration+1 };
      this.audioList.push(data);
      localStorage.setItem("audiolist", JSON.stringify(this.audioList));
      this.recordDuration = 0;
      this.recording = false;
      this.duration = null;
      this.saveAudio(data);
  }, 1000);




  }

  async deleteAudio(audio : AudioInterface) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar audio',
      message: '¿Está seguro de eliminar el audio '+audio.filename+'?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {            
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.slide.close();
            this.servicio.deleteAudio(audio);
          }
        }
      ]
    });

    await alert.present();
  }



   convertURIToBinary(dataURI) {
    let BASE64_MARKER = ';base64,';
    let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    let base64 = dataURI.substring(base64Index);
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let arr = new Uint8Array(new ArrayBuffer(rawLength));
  
    for (let i = 0; i < rawLength; i++) {
      arr[i] = raw.charCodeAt(i);
    }
    return arr;
  }
  

saveAudio(data){
  this.base64.encodeFile(this.filePath).then((base64File: string) => {
    let binary = this.convertURIToBinary(base64File);
    let blob = new Blob([binary], {
      type: 'audio/mp3'
  });  

  const id = Math.random().toString(5).substring(2);
  const filePath = `uploads/clase${this.nombreClase}`;
  const ref = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, blob);
  this.uploadPercent = task.percentageChanges();
  task.snapshotChanges().pipe(finalize(() => { 
    ref.getDownloadURL().subscribe(result =>{
      console.log("user data: ",this.authService.getUserData());
    
      let audio : any = {
        filename : `[CLASE] ${this.nombreClase}.mp3`,
        duration: data.duration,
        filepath: filePath,
        url : result,
        isPlay : data.isPlay,
        seconds : data.seconds,
        status: data.status,
        fecha : new Date().toDateString()

      } 
      audio.users = {[this.authService.getUserData().uid] : true};

      console.log(audio);
      this.servicio.addAudio(audio);
      this.nombreClase = '';

            });   
        })).subscribe();
      }, (err) => {
    console.log(err);
  });
}


getAudioList() {
  let user = this.authService.isAuth().subscribe(user =>{
    this.servicio.getUserAudios(user.uid).subscribe(
      audios => {this.audioList = audios, console.log(this.audioList)}
    )
  });
  }


  stopAudio(audio){
    audio.isPlay = false;
    audio.status = 0;
    this.audio.stop();
  }



  playAudio(file : AudioInterface, index) {
    if(this.audio){
      this.audioList.forEach(e =>{
        e.isPlay = false;
        e.status = 0;
      })
      this.audio.stop();  
    }
  


    this.filePath = file.url;
    this.audio = this.media.create(this.filePath);
    this.audio.play();
  

    let flag = false;
    this.audio.onStatusUpdate.subscribe(status =>{
      if(status.toString() == '2'){          
        this.ngZone.run(() =>{
          file.isPlay = true;
       
        let loop = () => {
          if(flag == false){
            setTimeout( () => {
              file.status +=1;
              console.log(file.status);
            if(flag == false){
              loop();
            }

          }, 1000)}
        }
        loop();
      })
    }
    if(status.toString() == '4'){
      flag = true;
    }
    
  })

  this.audio.onSuccess.subscribe(result => {
    this.ngZone.run(() => { 
      flag = true;
      setTimeout(() =>{
        console.log("duracion recorrida : ",file.status, parseFloat('0.'+file.status.toString()) )
        file.status = 0;
        console.log("ya termino"); file.isPlay = false; console.log(this.audioList)
      

      },1000);
   
    });
  });
  this.audio.setVolume(0.8);  
    
}


formatear(e){
  let d = Number(e);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  let tiempo;
  if(h <=0){          
    tiempo = m.toString().padStart(2, '0') + ':' + 
             s.toString().padStart(2, '0');
  }else{          
    tiempo = h.toString().padStart(2, '0') + ':' + 
    m.toString().padStart(2, '0') + ':' + 
    s.toString().padStart(2, '0');     
  }
  return tiempo;

}



}