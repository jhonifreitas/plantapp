import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { CamerasPage } from '../pages/cameras/cameras';
import { CamerasFormPage } from '../pages/cameras-form/cameras-form';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { GruposPage } from '../pages/grupos/grupos';
import { GruposFormPage } from '../pages/grupos-form/grupos-form';
import { LocalPage } from '../pages/local/local';
import { LocalFormPage } from '../pages/local-form/local-form';
import { LoginPage } from '../pages/login/login';
import { PlantacoesPage } from '../pages/plantacoes/plantacoes';
import { PlantacoesFormPage } from '../pages/plantacoes-form/plantacoes-form';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { UsuariosFormPage } from '../pages/usuarios-form/usuarios-form';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceProvider } from '../providers/service/service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { FunctionsDefaultProvider } from '../providers/functions-default/functions-default';
import { StorageProvider } from '../providers/storage/storage';

import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';

// LOCALE
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    MyApp,
    CamerasPage,
    CamerasFormPage,
    DashboardPage,
    GruposPage,
    GruposFormPage,
    LocalPage,
    LocalFormPage,
    LoginPage,
    PlantacoesPage,
    PlantacoesFormPage,
    UsuariosPage,
    UsuariosFormPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CamerasPage,
    CamerasFormPage,
    DashboardPage,
    GruposPage,
    GruposFormPage,
    LocalPage,
    LocalFormPage,
    LoginPage,
    PlantacoesPage,
    PlantacoesFormPage,
    UsuariosPage,
    UsuariosFormPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    ServiceProvider,
    FunctionsDefaultProvider,
    StorageProvider,
    FileTransfer,
    Camera
  ]
})
export class AppModule {}
