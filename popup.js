var tabid;
var tabURL;
var persist=true;
function loadStuff(){
  chrome.tabs.query({active:true,currentWindow:true},function(tab){
    if(tab[0]){
    tabid=tab[0].id;
    tabURL=tab[0].url//.split("#")[0];
    tabTitle=tab[0].title;
    getStuff();
    }else{
      document.body.innerHTML="No tab to annotate"
    }
    })
}
function setStuffLambda(callback){
  return function(){
  var tabobj={};
  if(persist){
   tabobj['url-'+tabURL]={URL:tabURL,title:tabTitle,value:document.getElementById('annotext').value.trim()}
  }else{
   tabobj['tab-'+tabid]={URL:tabURL,title:tabTitle,value:document.getElementById('annotext').value.trim()}
  }

  chrome.storage.sync.set(tabobj, callback);
}
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

document.getElementById('updatebutton').onclick=setStuffLambda(function(){window.close()});
document.getElementById('annotext').onblur=setStuffLambda(function(){});
document.getElementById('dismissbutton').onclick=function(){chrome.storage.sync.remove(['tab-'+tabid,'url-'+tabURL],function(){window.close()})};
document.getElementById('showallbutton').onclick=function(){  chrome.tabs.create({
    url: "list.html",
    pinned: false,
    windowId: window.id,
    active: true
  }, null);};

document.getElementById('persist').onclick=function(){persist=!persist;event.stopPropagation();}
document.getElementById('persist-button').onclick=function(){persist=!persist;document.getElementById('persist').checked = !document.getElementById('persist').checked}
loadStuff()

//Debug: chrome.storage.sync.get(null,function(item){console.log(item)})
