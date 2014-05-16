
function addTr(key,value){
  var tr=document.createElement('tr');
  tabtitle=value.title;
  if(tabtitle!=tabtitle.substr(0,50)){
    tabtitle=tabtitle.substr(0,50)+"..."
  }
  tr.innerHTML="<td style='width:45%'><a href='"+value.URL+"'>"+tabtitle+"</a></td><td style='width:55%'>"+value.value+"<button style='float:right;' data-key="+key+" class='dismiss btn btn-sm btn-primary'>Dismiss</button><button style='float:right;' data-key="+key+" class='goto btn btn-sm btn-primary' >Goto tab</button></td>"
  tr.getElementsByClassName('goto')[0].onclick=gotoTab;
  tr.getElementsByClassName('dismiss')[0].onclick=dismiss;
  document.getElementById('maintable').appendChild(tr)
}
function updateTable(){
document.getElementById('maintable').innerHTML=""
for(key in keys){
  addTr(key,keys[key]);
} 
}
var keys={};
function gotoTab(){
  key=this.getAttribute('data-key');
  if(key.substr(0,4)=="tab-"){
    gotoTabId(parseInt(key.split("tab-")[1]));

  }else{
    chrome.tabs.query({'url':key.split("url-")[1]},function(tabs){
      if(tabs.length<1){
        window.open(key.split("url-")[1]);
        return;
      }
      gotoTabId(tabs[0].id);
    });
  }
}
function gotoTabId(tabid){
    chrome.tabs.update(tabid, {active:true},function(){})
    chrome.tabs.get(tabid,function(tab){
      chrome.windows.update(tab.windowId,{'focused':true});
    }) 
}
function dismiss(){
  key=this.getAttribute('data-key');
  chrome.storage.sync.remove([key],function(){})
}
function update(){
  chrome.storage.sync.get(null,function(data){keys=data;updateTable()})
}
chrome.storage.onChanged.addListener(update)
update();
