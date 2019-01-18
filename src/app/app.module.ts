import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {TestDynamicComponent} from './test-dynamic/test-dynamic.component';
import {P2UiEditorComponent} from './ui-editor/p2-ui-editor/p2-ui-editor.component';
import {LightBreakDynamicFormModule} from './dynamic/dynamic-form.module';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
    {
        path: '',
        component: P2UiEditorComponent
    },
    {
        path: 'test',
        component: TestDynamicComponent
    }

];

@NgModule({
    declarations: [
        AppComponent,
        TestDynamicComponent,
        P2UiEditorComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        [LightBreakDynamicFormModule.forRoot()],
        [RouterModule.forRoot(routes)],
        MalihuScrollbarModule.forRoot(),
    ],
    exports: [
        LightBreakDynamicFormModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
