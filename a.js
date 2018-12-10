function register()
{
  var nickname=encodeURIComponent(document.getElementById("nickname").value);
  var username=encodeURIComponent(document.getElementById("username").value);
  var password=encodeURIComponent(document.getElementById("password").value);
  var checkpw=encodeURIComponent(document.getElementById("checkpw").value);
  var xml=new XMLHttpRequest();
  xml.open("POST","register.php",true);
  xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xml.send("nickname="+nickname+"&username="+username+"&password="+password+"&checkpw="+checkpw);
  xml.onreadystatechange = function() 
  {
    if (xml.readyState == 4 && xml.status == 200) 
    {
      var res=xml.responseText;
      alert(res);
      if(res=="注册成功")
      {
        location.reload();
      }
    }
  }
}


function login()
{
  var username=encodeURIComponent(document.getElementById("username").value);
  var password=encodeURIComponent(document.getElementById("password").value);
  var xml=new XMLHttpRequest();
  xml.open("POST","login.php",true);
  xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xml.send("username="+username+"&password="+password);
  xml.onreadystatechange = function() 
  {
    if (xml.readyState == 4 && xml.status == 200) 
    {
      var res=xml.responseText;
      alert(res);
      if(res=="登陆成功")
      {
        location.href="liuyanban.html?t="+Math.random();
      }
    }
  }
}


function change()
{
  document.getElementById("head").innerHTML="注册";
  document.getElementById("initial_liuyanban").style.height="650px";

  var username=document.getElementsByClassName("input-information2");
  username[0].style.display="block";

  var checkpw=document.getElementsByClassName("input-information3");
  checkpw[0].style.display="block";

  var username=document.getElementById("username");
  username.value="";
  username.setAttribute("title","账号为数字且不超过16个字符");

  var password=document.getElementById("password");
  password.value="";
  password.setAttribute("title","密码不超过16个字符");

  var register=document.getElementsByClassName("sure");
  register[0].setAttribute("onclick","register()");

  var back=document.getElementsByClassName("register");
  back[0].setAttribute("onclick","location.reload()");
  back[0].setAttribute("value","返回");
}






function load()
{
  var xml=new XMLHttpRequest();
  xml.open("POST","welcome.php",true)
  xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xml.send();
  xml.onreadystatechange=function()
  {
    if(xml.readyState==4 && xml.status==200)
    {
      document.getElementById("nickname").innerText=xml.responseText;
      record();
    }
  }
}

function send()
{
  var content=encodeURIComponent(document.getElementById("content").value);
  var xml=new XMLHttpRequest();
  xml.open("POST","sendliuyan.php",true)
  xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xml.send("content="+content);
  xml.onreadystatechange=function()
  {
    if(xml.readyState==4 && xml.status==200)
    {
      alert(xml.responseText);
      if(xml.responseText=="请输入留言")
      {
        return;
      }
      document.getElementById("content").value="";
      document.getElementById("record").innerHTML="";
      record();
    }
  }
}
function send2()
{
  var content=encodeURIComponent(document.getElementById("content").value);
  var xml=new XMLHttpRequest();
  xml.open("POST","sendliuyan.php",true)
  xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xml.send("content="+content);
  xml.onreadystatechange=function()
  {
    if(xml.readyState==4 && xml.status==200)
    {
      alert(xml.responseText);
      if(xml.responseText=="请输入留言")
      {
        return;
      }

      guanli();
    }
  }
}




function record()
{
  var xml=new XMLHttpRequest();
  xml.open("POST","record.php",true);
  xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xml.send();
  xml.onreadystatechange=function()
  {
    if(xml.readyState==4 && xml.status==200)
    {
      eval("var res="+xml.responseText+";");
      for($i=0;$i<res.length;++$i)
      {
        var id=res[$i].id;
        var div=document.createElement("div");
        var att=document.createAttribute("id");
        att.value=id;
        div.setAttributeNode(att);
        div.setAttribute("class","block");
        var element=document.getElementById("record");
        element.appendChild(div);

        showPerson(id,res[$i].nickname,res[$i].username);
        showTime(id,res[$i].time);
        showContent(id,res[$i].content); 
      }
    }
  }
}
function showPerson(id,nickname,username)
{
    var div=document.createElement("div");
    var node=document.createTextNode("留言者: ");
    div.appendChild(node);
    
    var user=document.createElement("abbr");
    user.setAttribute("title","账号: "+username);
    user.setAttribute("class","person2");
    var node=document.createTextNode(nickname);
    user.appendChild(node);

    var att=document.createAttribute("class");
    att.value="person";
    div.setAttributeNode(att);
    var element=document.getElementById(id);
    element.appendChild(div);
    element.appendChild(user);
}
function showTime(id,time)
{
    var div=document.createElement("div");
    var node=document.createTextNode(time);
    div.appendChild(node);
    var att=document.createAttribute("class");
    att.value="time";
    div.setAttributeNode(att);
    var element=document.getElementById(id);
    element.appendChild(div);
}
function showContent(id,content)
{
    var div=document.createElement("div");
    var node=document.createTextNode(content);
    div.appendChild(node);
    var att=document.createAttribute("class");
    att.value="content";
    div.setAttributeNode(att);
    var element=document.getElementById(id);
    element.appendChild(div);
}



function guanli()
{
  var xml=new XMLHttpRequest();
  xml.open("POST","guanli.php",true);
  xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xml.send();
  xml.onreadystatechange=function()
  {
    if(xml.readyState==4 && xml.status==200)
    {
      if(xml.responseText=="请先登陆")
      {
        alert(xml.responseText);
        return;
      }
      document.getElementById("lishiliuyan").innerHTML="我的留言";
      document.getElementById("guanli").innerHTML="历史留言";
      var button=document.getElementById("guanli");
      button.setAttribute("onclick","location.reload()");
      var send=document.getElementById("send");
      send.setAttribute("onclick","send2()");
      var content=document.getElementById("content");
      content.value="";

      eval("var res="+xml.responseText+";");
      document.getElementById("record").innerHTML="";
      for($i=0;$i<res.length;++$i)
      {
        var id=res[$i].id;
        var div=document.createElement("div");
        var att=document.createAttribute("id");
        att.value=id;
        div.setAttributeNode(att);
        div.setAttribute("class","block");
        var element=document.getElementById("record");
        element.appendChild(div);
        showTime2(id,res[$i].time);
        showDelete(id);
        showModification(id);
        showContent(id,res[$i].content);
      }
      
    }
  }
}
function showTime2(id,time)
{
    var div=document.createElement("div");
    var node=document.createTextNode(time);
    div.appendChild(node);
    var att=document.createAttribute("class");
    att.value="time2";
    div.setAttributeNode(att);
    var element=document.getElementById(id);
    element.appendChild(div);
}

function showDelete(id)
{
  var button=document.createElement("button");
  var node=document.createTextNode("删除留言");
  button.appendChild(node);
  var att1=document.createAttribute("class");
  att1.value="float2";
  button.setAttributeNode(att1);
  var att2=document.createAttribute("onclick");
  att2.value="Delete("+id+")";
  button.setAttributeNode(att2);
  var element=document.getElementById(id);
  element.appendChild(button);
}
function Delete(id)
{
  var xml=new XMLHttpRequest();
  xml.open("POST","delete.php?t="+Math.random(),true);
  xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xml.send("id="+id);
  xml.onreadystatechange=function()
  {
    if(xml.readyState==4 && xml.status==200)
    {
      alert(xml.responseText);
      var record=document.getElementById("record");
      var child=document.getElementById(id);
      record.removeChild(child);
    }
  }
}

function showModification(id)
{
  var button=document.createElement("button");
  var node=document.createTextNode("修改留言");
  button.appendChild(node);
  var att1=document.createAttribute("class");
  att1.value="float2";
  button.setAttributeNode(att1);
  var att2=document.createAttribute("onclick");
  att2.value="modificationPre("+id+")";
  button.setAttributeNode(att2);
  var element=document.getElementById(id);
  element.appendChild(button);
}
function modificationPre(id)
{

  var element=document.getElementById(id);
  var content=element.childNodes[3].innerText;

  element.removeChild(element.childNodes[3]);

  var input=document.createElement("input");
  input.setAttribute("class","modification");
  input.setAttribute("value",content);
  input.setAttribute("type","text");
  input.setAttribute("spellcheck","false");

  element.appendChild(input);


  var back=element.childNodes[2];
  var sure=element.childNodes[1];
  
  back.setAttribute("onclick","back("+id+")");
  sure.setAttribute("onclick","modification("+id+")");

  back.innerHTML="返回";
  sure.innerHTML="确认";


}
function back(id)
{
  var element=document.getElementById(id);
  var content=element.childNodes[3].getAttribute("value");
  element.removeChild(element.childNodes[3]);
  showContent(id,content);

  var modification=element.childNodes[2];
  var Delete=element.childNodes[1];
  modification.innerHTML="修改留言";
  Delete.innerHTML="删除留言";
  modification.setAttribute("onclick","modificationPre("+id+")");
  Delete.setAttribute("onclick","Delete("+id+")");
}
function modification(id)
{
  var element=document.getElementById(id);
  var content=element.childNodes[3].value;
  var content2=element.childNodes[3].getAttribute("value");
  var content3=encodeURIComponent(content);

  if(content=="")
  {
    alert("内容都没有你改啥呢");
    return;
  }
  if(content==content2)
  {
    alert("跟原来一样你改啥呢");
    return;
  }

  var xml=new XMLHttpRequest();
  xml.open("POST","modification.php",true);
  xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xml.send("content="+content3+"&id="+id);
  xml.onreadystatechange=function()
  {
    if(xml.readyState==4 && xml.status==200)
    {
      alert(xml.responseText);
      element.removeChild(element.childNodes[3]);
      showContent(id,content);

      var modification=element.childNodes[2];
      var Delete=element.childNodes[1];
      modification.innerHTML="修改留言";
      Delete.innerHTML="删除留言";
      modification.setAttribute("onclick","modificationPre("+id+")");
      Delete.setAttribute("onclick","Delete("+id+")");
    }
  }
}