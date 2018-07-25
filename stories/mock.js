const browser = require('sinon-chrome/webextensions');
const chrome = require('sinon-chrome/extensions');
global.browser = browser;
global.chrome = chrome;
browser.flush();
chrome.runtime.connect.returns({
  onMessage: { addListener: () => {} }
});

export default browser;
