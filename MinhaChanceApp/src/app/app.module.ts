import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponentComponent } from './home-component/home-component.component';
import {MatCardModule} from '@angular/material/card';
import { CoursesListComponent } from './courses-component/courses-list/courses-list.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CoursesRegisterComponent } from './courses-component/courses-register/courses-register.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VacanciesListComponent } from './vacancies-component/vacancies-list/vacancies-list.component';
import { VacanciesDetailsComponent } from './vacancies-component/vacancies-details/vacancies-details.component';
import { VacanciesRegisterComponent } from './vacancies-component/vacancies-register/vacancies-register.component';
import { UserVacancyDetailsChartComponent } from './charts-component/user-vacancy-details-chart/user-vacancy-details-chart.component';
import { UserInteligenceDetailsChartComponent } from './charts-component/user-inteligence-details-chart/user-inteligence-details-chart.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UserVacancyDetailsDialogComponent } from './Dialogs/user-vacancy-details-dialog/user-vacancy-details-dialog.component';
import { SkillsTestComponent } from './skills-test-component/skills-test/skills-test.component';
import { SkillsResultComponent } from './skills-test-component/skills-result/skills-result.component';
import { UserInteligenceResultChartComponent } from './charts-component/user-inteligence-result-chart/user-inteligence-result-chart.component';
import { SkillsStartComponent } from './skills-test-component/skills-start/skills-start.component';
import { UsersProfileComponent } from './users-component/users-profile/users-profile.component';
import {MatListModule} from '@angular/material/list';
import { UserInteligenceListChartComponent } from './charts-component/user-inteligence-list-chart/user-inteligence-list-chart.component';
import { UserVacancyListChartComponent } from './charts-component/user-vacancy-list-chart/user-vacancy-list-chart.component';
import { UserVacancyListDialogComponent } from './Dialogs/user-vacancy-list-dialog/user-vacancy-list-dialog.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { UsersRegisterComponent } from './users-component/users-register/users-register.component';
import {MatTabsModule} from '@angular/material/tabs';
import { UsersDataComponent } from './users-component/users-data/users-data.component';
import { UsersDetailsComponent } from './users-component/users-details/users-details.component';
import { UsersInterestsComponent } from './users-component/users-interests/users-interests.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    CoursesListComponent,
    CoursesRegisterComponent,
    VacanciesListComponent,
    VacanciesDetailsComponent,
    VacanciesRegisterComponent,
    UserVacancyDetailsChartComponent,
    UserInteligenceDetailsChartComponent,
    UserVacancyDetailsDialogComponent,
    SkillsTestComponent,
    SkillsResultComponent,
    UserInteligenceResultChartComponent,
    SkillsStartComponent,
    UsersProfileComponent,
    UserInteligenceListChartComponent,
    UserVacancyListChartComponent,
    UserVacancyListDialogComponent,
    LoginComponentComponent,
    UsersRegisterComponent,
    UsersDataComponent,
    UsersDetailsComponent,
    UsersInterestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSliderModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
