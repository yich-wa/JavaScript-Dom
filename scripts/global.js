function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload!='function'){
	window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lashChild == targetElement){
		parentNode.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
function addClass(element,value){
	if(!element.className){
		element.className=value;
	}else
	{
		newClassName = element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className = newClassName;
	}
}
function highlightPage(href){
	//alert("1");
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers = document.getElementsByTagName('header');
	if(headers.length==0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if(navs.length==0)return false;
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i = 0;i<links.length;i++){
		linkurl=links[i].getAttribute("href");
		//console.log(linkurl);
		if(window.location.href.indexOf(linkurl)!=-1){
			//alert("0");
			//设置样式，使之标题高亮显示
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			//console.log(linktext);
			document.body.setAttribute("id",linktext);
			//alert("0");
		}
		//alert("10");
	}
	
}


function moveElement(elementID,final_x,final_y,interval) {
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	//console.log(elem.movement);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.top){
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(xpos == final_x&&ypos == final_y){
		return true;
	}
	if(xpos<final_x){
		var dist = Math.ceil((final_x-xpos)/10);
		xpos = xpos+dist;
	}
	if(xpos>final_x){
		var dist = Math.ceil((xpos-final_x)/10);
		xpos = xpos-dist;
	}
	if(ypos<final_y){
		var dist = Math.ceil((final_y-ypos)/10);
		ypos = ypos+dist;
	}
	if(ypos>final_y){
		var dist = Math.ceil((ypos-final_y)/10);
		ypos = ypos-dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval); //定时器，事件发生后，每隔Interval执行一次这个函数。
	//上下两个函数是一样的。但是moveElement函数的调用，必须放在，function()里面
	// elem.movement = setTimeout(function(){
	// 	moveElement(elementID,final_x,final_y,interval);
	// },interval);

}

function prepareSlideshow(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt"," no");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	//触发段落内容会引起幻灯片
	//var links = intro.getElementsByTagName("a");

	//触发所有，只要"a"复合当前的Href就会变化，等于扩大范围。
	var links = document.getElementsByTagName("a");
	var destination;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover = function(){
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html")!=-1){
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html")!=-1){
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html")!=-1){
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("live.html")!=-1){
				moveElement("preview",-450,0,5);
			}
			if(destination.indexOf("contact.html")!=-1){
				moveElement("preview",-600,0,5);
			}
		}
	}
}

function showSection(id){
	var sections = document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id")!=id){
			sections[i].style.display = "none";
		}else{
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	console.log(links);
	for(var i=0;i<links.length;i++){

		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
 		links[i].destination = sectionId;
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		}
	}

}

function showPic(whichpic){
	if(!document.getElementById("placeholder")) return true;
	var source = whichpic.getAttribute("href");
	var placeholder= document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if(!document.getElementById("description")) return false;
	if(whichpic.getAttribute("title")){
		var text = whichpic.getAttribute("title");
	}else{
		var text = "";
	}
	var description = document.getElementById("description");
	if(description.firstChild.nodeType==3){
		description.firstChild.nodeValue = text;
	}
	return false;
}

//创建占位符图片你的位置
function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");//为啥是gif
	placeholder.setAttribute("alt","my image gallery");
	//console.log(placeholder);
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}

//准备点击事件
function prepareGallery(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this);
		}
	}
}

//使表格内容的底色按条状间隔
function stripeTables(){
	if(!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for(var i=0;i<tables.length;i++){
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for(var j=0;j<rows.length;j++){
			if(odd==true){
				addClass(rows[j],"odd");
				odd=false;
			}else{
				odd=true;
			}
		}
	}
}

//当鼠标置于某行之上时，改行高亮显示。
function highlightRows(){
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].oddClassName = rows[i].className;
		rows[i].onmouseover = function(){
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function(){
			this.className = this.oddClassName;
		}
	} 
}

//将缩略信息展示出来
function displayAbbreviations(){
	if(!document.getElementsByTagName||!document.createElement||!document.createTextNode) return false;
	var abbreviations = document.getElementsByTagName("abbr");
	if(abbreviations.length<1) return false;
	var defs = new Array();
	for(var i=0;i<abbreviations.length;i++){
		var current_abbr = abbreviations[i];
		var defination = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key]=defination;
	}	
	var dlist = document.createElement("dl");
	for(key in defs){
		var defination = defs[key];
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddsec = document.createElement("dd");
		var ddsec_text = document.createTextNode(defination);
		ddsec.appendChild(ddsec_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddsec);
	}
	if(dlist.childNodes.length<1) return false;
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles = document.getElementsByTagName("article");
	if(articles.length<1) return false;
	var container = articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}

//单击标签获得焦点
function focusLabels(){
	if(!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for(var i=0;i<labels.length;i++){
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function(){
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}

//单击时，占位符消失，失去焦点后，占位符重新出现（没有输入）
function resetFields(whichform){
	//alert('9');
	//检查浏览器是否支持placeholder，支持就用placeholder,
	//直接返回，不支持，就用后面自己写的。
	if(Modernizr.input.placeholder){
		//alert('1');
		return ;
	}
	//alert('9');
	for(var i=0;i<whichform.elements.length;i++){
		var element = whichform.elements[i];
		if(element.type =="submit") continue;
		var check = element.placeholder||element.getAttribute('placeholder');
		if(!check) continue;
		element.onfocus = function(){
			var text = this.placeholder||this.getAttribute('placeholder');
			if(this.value==text){
				this.className = '';
				this.value ="";
				//alert('1');
			}
		}
		element.onblur = function(){
			if(this.value==""){
				this.className='placeholder';
				this.value= this.placeholder ||this.getAttribute('placeholder');
			}
		}
		element.onblur(); 
	}
}

function prepareForms(){
	for(var i=0;i<document.forms.length;i++){
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function(){
			return validateForm(this);
		}
	}
}

//客户端检验，是否填内容了。
function isFilled(field){
	if(field.value.replace(' ','').length==0) return false;
	var placeholder = field.placeholder||field.getAttribute('placeholder');
	return (field.value!=placeholder);
}

//客户端检验，邮件格式是否正确
function isEmail(field){
	return (field.value.indexOf("@")!=-1&&field.value.indexOf("."));
}

//反馈,表示提交的表单是否合格。
function validateForm(whichform){
	for(var i=0;i<whichform.elements.length;i++){
		var element=whichform.elements[i];
		//下面表明，要求该空必须填
		if(element.required =='required'){
			if(!isFilled(element)){
				alert("Please fill in the "+element.name+" field.");
				return false;
			}
		}

		if(element.type=='email'){
			if(!isEmail(element)){
				alert("The "+element.name+" field must be a valid email address.");
				return false;
			}
		}
	}
	//要么在前面已经返回false，否则就需要返回true;
	return true;
}

function getHTTPObject(){
	if(typeof XMLHttpRequest =="undefined") 
		XMLHttpRequest = function(){
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}catch(e){}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}catch(e){}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){}
			return false;
		}
		return new XMLHttpRequest();
}

//添加加载图片
function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}

function submitFormWithAjax(whichform,thetarget){
	//检查是否存在有效的XMLHttpRequest
	var request = getHTTPObject();
	if(!request) return false;
	displayAjaxLoading(thetarget);
	var dataParts = [];
	var element;
	for(var i=0;i<whichform.elements.length;i++){
		element = whichform.elements[i];
		dataParts[i]= element.name + '=' +encodeURIComponent(element.value);
	}
	var data = dataParts.join('&');
	//发送请求，并加头部
	request.open('POST',whichform.getAttribute("action"),true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	//替换 <article>部分。
	request.onreadystatechange = function(){
		if(request.readyState ==4){
			if(request.status ==200||request.status ==0){
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if(matches.length>0){
					thetarget.innerHTML = mathches[1];
				}else{
					thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
				}
			}else{
				thetarget.innerHTML = '<p>' + request.statusText + '</p>';
			}
		}
	};
	request.send(data);
	return true;	
}

//拦截表单任务
function prepareForms(){
	for(var i=0;i<document.forms.length;i++){
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function(){
			if(!validateForm(this))return false;
			var article = document.getElementsByTagName('article')[0];
			if(submitFormWithAjax(this,article)) return false;
			return true;
		}
	}
}


addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);