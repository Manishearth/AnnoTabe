var tabid;

function loadStuff(){
  chrome.tabs.query({active:true,currentWindow:true},function(tab){
    tabid=tab[0].id;
    getStuff();
    })
}
function setStuff(){
  var tabobj={};
  tabobj['tab-'+tabid]=document.getElementById('abc').value
     chrome.storage.sync.set(tabobj, function() {});

}
function getStuff(){
  chrome.storage.sync.get(['tab-'+tabid], function(items) {  if(items['tab-'+tabid]){document.getElementById('abc').value=items['tab-'+tabid]}});
}

document.getElementById('update').onclick=setStuff;
loadStuff()
