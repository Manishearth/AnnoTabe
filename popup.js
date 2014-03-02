var tabid;

function loadStuff(){
  chrome.tabs.query({active:true,currentWindow:true},function(tab){
    tabid=tab[0].id;
    getStuff();
    })
}
function setStuff(){
  var tabobj={};
  tabobj['tab-'+tabid]=document.getElementById('annotext').value
     chrome.storage.sync.set(tabobj, function() {window.close()});

}
function getStuff(){
  chrome.storage.sync.get(['tab-'+tabid], function(items) {  if(items['tab-'+tabid]){document.getElementById('annotext').value=items['tab-'+tabid]}});
}

document.getElementById('updatebutton').onclick=setStuff;
document.getElementById('dismissbutton').onclick=function(){chrome.storage.sync.remove(['tab-'+tabid],function(){window.close()})};
loadStuff()
