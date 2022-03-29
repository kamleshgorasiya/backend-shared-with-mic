
import { NgModule } from '@angular/core';
import { SharedModule, registerFormInputComponent } from '@vendure/admin-ui/core';
import {ShareDropDownControl} from './share/shareDropdown.component'

@NgModule({
  imports: [SharedModule],
  declarations: [ShareDropDownControl],
  providers: [
    registerFormInputComponent('dropdown-form-input', ShareDropDownControl),
  ]
})
export class SharedExtensionModule {}