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
import { OverAllExampleComponent } from './over-all-example/over-all-example.component';
import { FunctionMaualComponent } from './function-maual/function-maual.component';
import { ExplanationPanelComponent } from './function-maual/explanation-panel/explanation-panel.component';
import { FunctionSpecificationComponent } from './function-maual/function-specification/function-specification.component';
import { FunctionPanelComponent } from './function-maual/function-panel/function-panel.component';

const routes: Routes = [
    {
        path: '',
        component: OverAllExampleComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        TestDynamicComponent,
        P2UiEditorComponent,
        OverAllExampleComponent,
        FunctionMaualComponent,
        ExplanationPanelComponent,
        FunctionSpecificationComponent,
        FunctionPanelComponent,
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
