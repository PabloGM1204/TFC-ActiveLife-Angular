import { Observable, from, map } from 'rxjs';
import { UserCredentials } from '../../interfaces/user-credentials';
import { UserRegisterInfo } from '../../interfaces/user-register-info';
import { User } from '../../interfaces/user';
import { AuthService } from '../auth/auth.service';
import { FirebaseService, FirebaseUserCredential } from './firebase.service';

export class FirebaseAuthService extends AuthService{

  /**
  * Constructor de la clase.
  * 
  * @param firebaseSvc Servicio de Firebase utilizado para manejar la autenticación y los datos del usuario.
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
  * Método para iniciar sesión con las credenciales del usuario.
  *
  * @param credentials Las credenciales del usuario, incluyendo nombre de usuario y contraseña.
  * @returns Un observable que emite datos del usuario al iniciar sesión exitosamente o un error en caso de fallo.
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
  * Método para registrar un nuevo usuario con la información proporcionada.
  *
  * @param info La información de registro del usuario, incluyendo correo electrónico y contraseña.
  * @returns Un observable que emite los datos del usuario registrado exitosamente o un error en caso de fallo.
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
  * Método privado que realiza operaciones adicionales después del registro del usuario.
  *
  * @param info La información del usuario, incluyendo su UUID y otros datos necesarios.
  * @returns Un observable que emite el resultado de la creación del documento del usuario en Firebase.
  * @throws Error en caso de que no se proporcione un UUID en la información del usuario.
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
  * Método que obtiene los datos del usuario actualmente autenticado.
  *
  * @returns Un observable que emite los datos del usuario si está autenticado.
  * @throws Error en caso de que el usuario no esté conectado.
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
  * Método que cierra la sesión del usuario actualmente autenticado.
  *
  * @returns Un observable que emite el resultado del cierre de sesión.
  */
  public logOut(): Observable<any> {
    return from(this.firebaseSvc.signOut(false));
  }

  /**
  * Método que elimina la cuenta del usuario con el ID especificado.
  *
  * @param id El ID del usuario cuya cuenta será eliminada.
  * @returns Un observable que emite void al completar la eliminación de la cuenta.
  */
  public override deleteAccount(id: number): Observable<void> {
    return new Observable<void>
  }
}