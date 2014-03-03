chrome.tabs.onRemoved.addListener(function(id,stuff){
  chrome.storage.sync.remove(['tab-'+id],function(){})
})
function updateBadges(){
chrome.storage.sync.get(null,function(keys){
chrome.tabs.query({},function(tabs){
for (tab in tabs){
tabid=tabs[tab].id;
tabURL=tabs[tab].url;
console.log(tabs[tab])
 if(keys["tab-"+tabid] || keys["url-"+tabURL]){
   chrome.browserAction.setBadgeText({text:"!",tabId:tabid})
 }
}
})
});
}

function updatePageBadge(a,b,tab){
  console.log(tab);
  chrome.storage.sync.get(["tab-"+tab.id,"url-"+tab.url],function(keys){
  if(keys["tab-"+tab.id] || keys["url-"+tab.url]){
    chrome.browserAction.setBadgeText({text:"!",tabId:tab.id})
  }
});
}
chrome.storage.onChanged.addListener(updateBadges);
chrome.tabs.onUpdated.addListener(updatePageBadge)
