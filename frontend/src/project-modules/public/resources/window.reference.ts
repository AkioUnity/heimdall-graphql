import { Injectable } from '@angular/core';

function _window(): any {
  // return the global native browser navigator object
  return window;
}

@Injectable()
export class WindowRef {
  get nativeWindow(): any {
    return _window();
  }
}