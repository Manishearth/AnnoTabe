var tabid;
var tabURL;
var persist=true;
function loadStuff(){
  chrome.tabs.query({active:true,currentWindow:true},function(tab){
    tabid=tab[0].id;
    tabURL=tab[0].url//.split("#")[0];
    getStuff();
    })
}
function setStuff(){
  var tabobj={};
  if(persist){
   tabobj['url-'+tabURL]={URL:tabURL,value:document.getElementById('annotext').value}
  }else{
   tabobj['tab-'+tabid]={URL:tabURL,value:document.getElementById('annotext').value}
  }

  chrome.storage.sync.set(tabobj, function() {window.close()});    
}
function getStuff(){
  chrome.storage.sync.get(['tab-'+tabid,'url-'+tabURL], function(items) {
    if(items['tab-'+tabid]){
      persist=false;
      document.getElementById('persist').checked=persist;
      document.getElementById('annotext').value=items['tab-'+tabid].value
    }else if(items['url-'+tabURL]){
      persist=true;
      document.getElementById('annotext').value=items['url-'+tabURL].value
    }
    
    });
}

document.getElementById('updatebutton').onclick=setStuff;
document.getElementById('dismissbutton').onclick=function(){chrome.storage.sync.remove(['tab-'+tabid,'url-'+tabURL],function(){window.close()})};
document.getElementById('showallbutton').onclick=function(){  chrome.tabs.create({
    url: "list.html",
    pinned: false,
    windowId: window.id,
    active: true
  }, null);};

document.getElementById('persist').onclick=function(){persist=!persist}
loadStuff()

//Debug: chrome.storage.sync.get(null,function(item){console.log(item)})
