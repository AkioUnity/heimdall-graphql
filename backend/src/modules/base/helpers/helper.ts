import * as bcrypt from 'bcrypt';

export class Helper {
    // used to enctypt string
    static SALTROUNDS = 10;

    /**
     * Encrypt str with bcrypt
     * @param str 
     */
    static encrypt(str) {
        return bcrypt.hash(str, this.SALTROUNDS);
    }

    /**
     * Verify password
     * @param password 
     * @param hashedPassword 
     */
    static verifyPassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }

}