/**
 * Sort array
 */
export class CustomSort {

  static sortByValue(a, b) {
    let valueA = a.value.toUpperCase(); // ignore upper and lowercase
    let valueB = b.value.toUpperCase(); // ignore upper and lowercase
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    // value must be equal
    return 0;
  }

  static sortByName(a, b) {
    let nameA = a.name.toUpperCase(); // ignore upper and lowercase
    let nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // name must be equal
    return 0;
  }

  static sortByTitle(a, b) {
    let titleA = a.title.toUpperCase(); // ignore upper and lowercase
    let titleB = b.title.toUpperCase(); // ignore upper and lowercase
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    // title must be equal
    return 0;
  }
}
