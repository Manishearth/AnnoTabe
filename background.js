chrome.tabs.onRemoved.addListener(function(id,stuff){
  chrome.storage.sync.remove(['tab-'+id],function(){})
})
