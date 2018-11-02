/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Close the webview inside Messenger
 * For more information on webview controls in MessengerExntension,
 * refer to the webview docs:
 * https://developers.facebook.com/docs/messenger-platform/messenger-extension
 *
 *  @returns {undefined}
 */
const close = () => {
  window.MessengerExtensions.requestCloseBrowser(function success() {
    return;
  }, function error(err) {
    console.error(
      err,
      'No se puede cerrar la ventana.',
      'Es posile que la este accesando desde fuera de messenger.'
    );
  });
};

export default {
  close,
};
