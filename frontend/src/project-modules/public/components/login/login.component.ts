import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Fido2Helper, WindowRef } from "@projectModules/public/resources";
import { AuthenticationService } from "@projectModules/public/services";
import { AuthenticationModel } from "@projectModules/public/models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [Fido2Helper, WindowRef]
})
export class LoginComponent implements OnInit {

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
    this.fg = this.fb.group(new AuthenticationModel().loginValidationRules());
  }

  login(formData: AuthenticationModel) {
    this.loaded = false;

    this.authenticationService.fido2Login(formData).subscribe(response => {
      let publicKey = this.fido2Helper.preformatGetAssertReq(response);
      console.log('login publicKey: ', publicKey);
      if (publicKey) {

        return this.windowRef.nativeWindow.navigator.credentials.get({ publicKey }).then(fido2Cred => {
          console.log('FIDO2 GET Credentials: ', fido2Cred);

          if (fido2Cred) {

            this.loaded = true;// temporary

            // this.saveSampleData(fido2Cred);

            let getAssertionResponse = this.fido2Helper.publicKeyCredentialToJSON(fido2Cred);

            console.log('getAssertionResponse: ', getAssertionResponse);

            // this.saveSampleData(fido2Cred);

            this.authenticationService.verifyFido2Resp(getAssertionResponse).subscribe(verifyFido2Resp => {

              console.log('verifyFido2Resp: ', verifyFido2Resp);
              alert('Logged in successfully');
              this.router.navigate(['/vehicles']);
              this.loaded = true;

            }, error => {
              this.loaded = true;
              console.log('verifyFido2Resp Error: ', error);
              alert('Appology! Something went wrong while logging in with FIDO2');
            })

          } else {
            alert('Appology! Something went wrong while getting Yubikey authentications');
            this.loaded = true;
          }

        }).catch(error => {
          this.loaded = true;
          console.log('FIDO2 Credentials Error: ', error);
          alert('Appology! Something went wrong while getting signature from FIDO2...');
        });

      } else {
        alert('Appology! Something went wrong while getting Yubikey signature');
        this.loaded = true;
      }
    }, error => {
      this.loaded = true;
      alert(error.message);
      console.log('Error in login service: ', error);
    });
  }
}
