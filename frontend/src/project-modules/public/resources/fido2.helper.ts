import { Injectable } from "@angular/core";
import base64url from 'base64url';

declare const Buffer;

@Injectable()
export class Fido2Helper {

  /**
   * Converts PublicKeyCredential into serialised JSON
   * @param  {Object} pubKeyCred
   * @return {Object}            - JSON encoded publicKeyCredential
   */
  public publicKeyCredentialToJSON(pubKeyCred) {
    if (pubKeyCred instanceof Array) {
      // console.log('in helper: array');
      let arr = [];
      for (let i of pubKeyCred)
        arr.push(this.publicKeyCredentialToJSON(i));

      return arr
    }

    if (pubKeyCred instanceof ArrayBuffer) {
      // if (pubKeyCred instanceof Buffer) { // customized
      // console.log('in helper: ArrayBuffer');
      // console.log('in helper: ArrayBuffer pubKeyCred before: ', pubKeyCred);

      // let pubKeyCredStringify = JSON.stringify(pubKeyCred);
      // console.log('pubKeyCredStringify: ', pubKeyCredStringify);
      
      // let pubKeyCredParse = JSON.parse(pubKeyCredStringify);
      // console.log('pubKeyCredParse: ', pubKeyCredParse);

      // pubKeyCred = JSON.stringify(pubKeyCred);
      // console.log('in helper: ArrayBuffer pubKeyCred after: ', pubKeyCred);

      let newPubKeyCred:any = pubKeyCred;

      let retResult = base64url.encode(newPubKeyCred);

      // console.log('retResult: ', retResult);
      return retResult;
    }

    if (pubKeyCred instanceof Object) {
      // console.log('in helper: Object');
      let obj = {};

      for (let key in pubKeyCred) {
        obj[key] = this.publicKeyCredentialToJSON(pubKeyCred[key])
      }

      return obj
    }

    return pubKeyCred
  }

  /**
  * Generate secure random buffer
  * @param  {Number} len - Length of the buffer (default 32 bytes)
  * @return {Uint8Array} - random string
  */
  public generateRandomBuffer(len) {
    len = len || 32;

    let randomBuffer = new Uint8Array(len);
    window.crypto.getRandomValues(randomBuffer);

    return randomBuffer
  }

  /**
  * Decodes arrayBuffer required fields.
  */
  public preformatMakeCredReq(makeCredReq) {

    const parsedChallenge = JSON.parse(base64url.decode(makeCredReq.challenge));

    const parsedUserId = JSON.parse(base64url.decode(makeCredReq.user.id));

    makeCredReq.challenge = new Uint8Array(parsedChallenge);
    makeCredReq.user.id = new Uint8Array(parsedUserId);

    return makeCredReq
  }

  /**
  * Decodes arrayBuffer required fields.
  */
  public preformatGetAssertReq(getAssert) {
    getAssert.challenge = JSON.parse(base64url.decode(getAssert.challenge));

    for (let allowCred of getAssert.allowCredentials) {
      allowCred.id = base64url.decode(allowCred.id);
    }

    return getAssert
  }
}
