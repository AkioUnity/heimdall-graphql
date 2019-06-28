import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthenticationService } from "@projectModules/public/services";
import { AuthenticationModel } from "@projectModules/public/models";
import { Fido2Helper, WindowRef } from "@projectModules/public/resources";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [Fido2Helper, WindowRef]
})
export class SignupComponent implements OnInit {

  public loaded: boolean = true;
  public fg: FormGroup;

  public attributesLabels = AuthenticationModel.attributesLabels;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private fido2Helper: Fido2Helper,
    private windowRef: WindowRef
  ) { }

  ngOnInit() {
    this.fg = this.fb.group(new AuthenticationModel().signupValidationRules());
  }

  signup(formData: AuthenticationModel) {
    this.loaded = false;

    this.authenticationService.signup(formData).subscribe(response => {

      let publicKey = this.fido2Helper.preformatMakeCredReq(response);
      console.log('publicKey: ', publicKey);
      if (publicKey) {

        // this.saveSampleData(publicKey);

        // this.windowRef.nativeWindow.navigator.credentials.create({ publicKey }).then(fido2Cred => {
        return this.windowRef.nativeWindow.navigator.credentials.create({ publicKey }).then(fido2Cred => {
          console.log('FIDO2 New Credentials: ', fido2Cred);

          if (fido2Cred) {

            this.loaded = true;// temporary

            // this.saveSampleData(fido2Cred);

            let makeCredResponse = this.fido2Helper.publicKeyCredentialToJSON(fido2Cred);

            console.log('makeCredResponse: ', makeCredResponse);

            // this.saveSampleData(fido2Cred);

            this.authenticationService.verifyFido2Resp(makeCredResponse).subscribe(verifyFido2Resp => {

              console.log('verifyFido2Resp: ', verifyFido2Resp);
              alert('Success! Registration is successfull, you can now log in with YubiKey');
              this.router.navigate(['/auth/login']);
              this.loaded = true;

            }, error => {
              this.loaded = true;
              console.log('verifyFido2Resp Error: ', error);
              alert('Appology! Something went wrong while registering with FIDO2...');
            })

          } else {
            alert('Appology! Something went wrong while getting Yubikey authentications');
            this.loaded = true;
          }

        }).catch(error => {
          this.loaded = true;
          console.log('FIDO2 Credentials Error: ', error);
          alert('Appology! Something went wrong while registering with FIDO2...');
        });

      } else {
        alert('Appology! Something went wrong while making Yubikey authentications');
        this.loaded = true;
      }
    }, error => {
      this.loaded = true;
      alert(error.message);
      console.log('Error in signup service: ', error);
    });
  }

  private saveSampleData(data: any): void {
    this.authenticationService.saveSampleData(data).subscribe(response => {
      console.log('saveSampleData response: ', response);
    }, error => {
      console.log('saveSampleData Error: ', error);
    });
  }
}
