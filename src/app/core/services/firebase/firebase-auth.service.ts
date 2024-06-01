import { Observable, from, map } from 'rxjs';
import { UserCredentials } from '../../interfaces/user-credentials';
import { UserRegisterInfo } from '../../interfaces/user-register-info';
import { User } from '../../interfaces/user';
import { AuthService } from '../auth/auth.service';
import { FirebaseService, FirebaseUserCredential } from './firebase.service';

export class FirebaseAuthService extends AuthService{

  /**
  * Constructor of the class.
  * 
  * @param firebaseSvc Firebase service used to handle user authentication and data.
  */
  constructor(
    private firebaseSvc:FirebaseService
  ) { 
    super();

    this.firebaseSvc.isLogged$.subscribe(logged=>{
      if(logged){
        this.me().subscribe({
          next:data=>{
            this._user.next(data);
            if(data.aceptado != false) {
              this._logged.next(true);
            }
          },
          error:err=>{
            console.log(err);
          }
        });
      }
      else{
        this._logged.next(false);
        this._user.next(null);
      }
    })
  }

  /**
  * Method to log in with user credentials.
  *
  * @param credentials User credentials, including username and password.
  * @returns An observable that emits user data upon successful login or an error in case of failure.
  */
  public login(credentials:UserCredentials):Observable<any>{
      return new Observable<any>(subscr=>{
        this.firebaseSvc.connectUserWithEmailAndPassword(credentials.username, credentials.password).then((credentials:FirebaseUserCredential|null)=>{
          if(!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid){
            subscr.error('Cannot login');
          }
          if(credentials){
            this.me().subscribe(data=>{
              this._user.next(data);
              if(data.aceptado != false){
                this._logged.next(true);
              }
              subscr.next(data);
              subscr.complete();
            });
          }
        })
      });
  }

  /**
  * Method to register a new user with the provided information.
  *
  * @param info User registration information, including email and password.
  * @returns An observable that emits data of the user successfully registered or an error in case of failure.
  */
  public register(info:UserRegisterInfo):Observable<any|null>{
    return new Observable<any>(subscr=>{
      this.firebaseSvc.createUserWithEmailAndPassword(info.email, info.password).then((credentials:FirebaseUserCredential|null)=>{
        if(!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid)
          subscr.error('Cannot register');
        if(credentials){
          var _info:any = {...info};
          console.log("Info del usuario ", info)
          _info.uuid = this.firebaseSvc.user?.uid;
          this.postRegister(_info).subscribe(data=>{
            console.log("Data usuario "+ data)
            this._user.next(_info);
            //this._logged.next(true);
            subscr.next(_info);
            subscr.complete();
          });
        }
      })
    });
  }

  /**
  * Private method that performs additional operations after user registration.
  *
  * @param info User information, including their UUID and other necessary data.
  * @returns An observable that emits the result of creating the user document in Firebase.
  * @throws Error if no UUID is provided in the user information.
  */
  private postRegister(info:any):Observable<any>{
    if(info.uuid){
      console.log(info)
      return from(this.firebaseSvc.createDocumentWithId('users',{
        username: info.nickname,
        email:info.email,
        admin: info.admin,
        aceptado: false,
        uuid: info.uuid,
    }, info.uuid))}
    throw new Error('Error inesperado');
  }

  /**
  * Method that retrieves data of the currently authenticated user.
  *
  * @returns An observable that emits the user data if authenticated.
  * @throws Error if the user is not logged in.
  */
  public me():Observable<any>{
    if(this.firebaseSvc.user?.uid)
      return from(this.firebaseSvc.getDocument('users', this.firebaseSvc.user.uid)).pipe(map(data=>{
        console.log("Datos de usuario logueado: "+ data.data['username']+" "+data.data['email'])
        return {
          name:data.data['username'],
          email:data.data['email'],
          uuid:data.id,
          photo: data.data['imageUrl'],
          admin: data.data['admin'],
          aceptado: data.data['aceptado'],
          fondo: data.data['fondo']
        }
    }));
    else
      throw new Error('User is not connected');
  }

  /**
  * Method that logs out the currently authenticated user.
  *
  * @returns An observable that emits the result of the logout.
  */
  public logOut(): Observable<any> {
    return from(this.firebaseSvc.signOut(false));
  }

  /**
  * Method that deletes the account of the user with the specified ID.
  *
  * @param id The ID of the user whose account will be deleted.
  * @returns An observable that emits void upon completing the account deletion.
  */
  public override deleteAccount(id: number): Observable<void> {
    return new Observable<void>
  }
}