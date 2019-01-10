import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {TestDynamicComponent} from './test-dynamic/test-dynamic.component';
import {P2UiEditorComponent} from './ui-editor/p2-ui-editor/p2-ui-editor.component';
import {LightBreakDynamicFormModule} from './dynamic/dynamic-form.module';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar';

const routes: Routes = [
    {
        path: 'test-dynamic',
        component: TestDynamicComponent
    },
    {
        path: 'ui-editor',
        component: P2UiEditorComponent
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
        LightBreakDynamicFormModule,
        [RouterModule.forRoot(routes)],
        MalihuScrollbarModule.forRoot(),
    ],
    exports: [
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
