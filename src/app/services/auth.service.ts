import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private googlePlus: GooglePlus, private afs: AngularFirestore,) { }


  googleLogin(){
    return this.googlePlus.login({
      'scopes': '', 
      'webClientId': environment.webClientId, 
      'offline': true, 
    }).then(user => {this.afsAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken)).then(
      credential => {console.log(credential.user), this.updateUserData(credential.user) }
    ).catch(error => {console.log(error)}) }).catch(error => {console.log(error)})
  }


  private updateUserData(user) {
    console.log("el usuario");
    console.log(user)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: any = {
      id: user.uid,
      email: user.email,
      roles: {
        editor: true
      }
    }
    return userRef.set(data, { merge: true })
  }



  async nativeGoogleLogin(): Promise<void> {
    try {
      const user = await this.googlePlus.login({
        'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': environment.webClientId, // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      }).then(
        user => {this.afsAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken)).then(
          result => {console.log("Login correctamente ",result);}
        )}
      ).catch(error =>{
        console.log("error ",error)
      })


/* 
      const firebaseUser = await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken)).then(
        result => {console.log("Login correctamente ",result)}
      ); */
     //this.updateUserData(firebaseUser);
      //this.router.navigate(["/tabs/profile"]);
   } catch (err) {
       console.log("error ",err)
    } 
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }


  getUserData(){
    return this.afsAuth.auth.currentUser;
  }



}
