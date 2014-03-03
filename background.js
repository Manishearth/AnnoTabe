chrome.tabs.onRemoved.addListener(function(id,stuff){
  chrome.storage.sync.remove(['tab-'+id],function(){})
})
function updateBadges(){
chrome.storage.sync.get(null,function(keys){
  chrome.tabs.query({},function(tabs){
    for (tab in tabs){
      tabid=tabs[tab].id;
      tabURL=tabs[tab].url;
      updateTab(keys,tabURL,tabid)

    }
  })
});
}

function updatePageBadge(a,b,tab){
  console.log(tab);
  chrome.storage.sync.get(["tab-"+tab.id,"url-"+tab.url],function(keys){
  updateTab(keys,tab.url,tab.id)
});
}

function updateTab(keys,url,id){
  
  if(keys["tab-"+id] || keys["url-"+url]){
   //chrome.browserAction.setBadgeText({text:"!",tabId:id})
   chrome.browserAction.setIcon({path:{"19":"icontildalactive19.png","38":"icontildalactive19.png"},tabId:id})
  }else{
    //chrome.browserAction.setBadgeText({text:"",tabId:id})
   chrome.browserAction.setIcon({path:{"19":"icontildal19.png","38":"icontildal19.png"},tabId:id})
  }
}
chrome.storage.onChanged.addListener(updateBadges);
chrome.tabs.onUpdated.addListener(updatePageBadge)
