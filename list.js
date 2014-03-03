
function addTr(key,value){
  var tr=document.createElement('tr');
  tabtitle=value.title;
  if(tabtitle!=tabtitle.substr(0,30)){
    tabtitle=tabtitle.substr(0,30)+"..."
  }
  tr.innerHTML="<td><a href='"+value.URL+"'>"+tabtitle+"</a></td><td width='500px'>"+value.value+"</td><td><button data-key="+key+" class=dismiss>Dismiss</button></td><td><button data-key="+key+" class=goto>Goto tab</button></td>"
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
    chrome.tabs.update(parseInt(key.split("tab-")[1]), {active:true},function(){})
  }else{
    chrome.tabs.query({'url':key.split("url-")[1]},function(tabs){
      if(tabs.length<1){
        window.open(key.split("url-")[1]);
        return;
      }
      chrome.tabs.update(tabs[0].id, {active:true},function(){})})
  }
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
