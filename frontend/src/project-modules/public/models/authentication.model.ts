import { FormControl, Validators } from '@angular/forms';
export class AuthenticationModel {

    public firstName?: string;
    public lastName?: string;
    public email: string;
    public password?: string;

    static attributesLabels = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        password: 'Password',
    };

    public loginValidationRules() {
        return {
            email: new FormControl('', [Validators.required, Validators.email]),
            // password: new FormControl('', [Validators.required]),
        };
    }

    public signupValidationRules() {
        return {
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
        };
    }

}