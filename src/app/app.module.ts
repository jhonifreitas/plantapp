import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { CamerasPage } from '../pages/cameras/cameras';
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
import { FunctionsDefaultProvider } from '../providers/functions-default/functions-default';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
  declarations: [
    MyApp,
    CamerasPage,
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
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CamerasPage,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    FunctionsDefaultProvider,
    StorageProvider
  ]
})
export class AppModule {}
