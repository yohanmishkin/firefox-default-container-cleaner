
function onCreated(context) {
  console.log(`New identity's ID: ${context.cookieStoreId}.`);
}

function onError(e) {
  console.error(e);
}

function cleanDefaultContainer() {
  var dateString = `${(new Date().getMonth() + 1)}-${new Date().getDate() + 1}-${new Date().getFullYear()}`
  var colors = ['red', 'orange', 'yellow', 'green', 'turquoise', 'blue', 'purple'];

  browser.contextualIdentities.create({
    name: dateString,
    color: colors[new Date().getDay()],
    icon: "circle"
  }).then((todaysContainer) => {
      const defaultCookieStoreId = "firefox-default";
      var defaultContainerTabs =
        browser.tabs.query({cookieStoreId: defaultCookieStoreId})
          .then((tabs) => {
            for (let tab of tabs) {
              browser.tabs.create({ url: tab.url, cookieStoreId: todaysContainer.cookieStoreId, index: tab.index+1, pinned: tab.pinned });
              browser.tabs.remove( tabs[0].id );
              console.log(tab.url);
            }
          });
   }, onError);
}

browser.browserAction.onClicked.addListener(cleanDefaultContainer);
