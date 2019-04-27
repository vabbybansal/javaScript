// localStorage.clear();	

/*COOKIE LIBRARY*/
function setLsCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function addToLsCookie(cname,addStr)
{
	var prvVal = getLsCookie(cname);
	if(prvVal.indexOf(addStr) == -1)
	{
		if(prvVal.length == 0)
		{
			var comm = "";
		}
		else var comm = ",";
		setLsCookie(cname,prvVal+comm+addStr,30);	
	}
	
}
function getLsCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0)
        {
        	if(c.substring(name.length, c.length) == 'empty')
        	{
        		return "";
        	}
        	else{
        		return decodeURIComponent(c.substring(name.length, c.length));	
        	}
        	
        } 
    }
    return "";
}

function deleteFromCookie(cname,cname_Del){
	var cnameArr = getLsCookie(cname).split(",");
	var cname_DelArr = getLsCookie(cname_Del).split(",");
	deleteArrFromArr(cnameArr,cname_DelArr);
	setLsCookie(cname,cnameArr.join(","),30);
}
function deleteArrFromArr(fromArr,delArr){
	for(var i = fromArr.length - 1; i >= 0; i--) {
		for(var j = delArr.length - 1; j >= 0; j--) {
		    if(fromArr[i] === delArr[j]) {
		       fromArr.splice(i, 1);
		    }
		}
	}
}

//EVENT HANDLER
function addEvent(elem, event, fn) {

			if (elem.addEventListener) {
				//console.log("ATTACHING AN EVENT");
				elem.addEventListener(event, fn, false);
				
			} else {
				elem.attachEvent("on" + event, function() {
					// set the this pointer same as addEventListener when fn is called
					
					return(fn.call(elem, window.event));   
				});
			}
		}


var dLS = (function(){
	var cnstns = {};
	cnstns.theTypes = [];
	cnstns.theNewElm = [];
	cnstns.theTypes['script'] = 'text/javascript';
	cnstns.theTypes['link'] = 'text/css';
	cnstns.theNewElm['script'] = 'script';
	cnstns.theNewElm['link'] = 'style';
	// LsObject generic class
	var LsObject = function(dLink, fType, skipLength){
	
		this.objType = fType;
		this.objLink = dLink;
		if(skipLength != true)
		{
			this.constructor.countObj++;	
		}
		
		//increment static object counter
	};
	//Static data members
	LsObject.countObj = 0;
	var dataLsObjects = [];

	
	//ASYNCH CALLS TO BE CHECKED
	var loadXMLDoc = function (obj,ind)
	{
		return function(){

			for(var i=ind;i<obj.length;i++){
				var xmlhttp;		
				if (window.XMLHttpRequest)
				{
					var xmlhttp=new XMLHttpRequest();
					if ("withCredentials" in xmlhttp) 
					{
						xmlhttp.onload = afterStyle(obj[i]);	
					 	xmlhttp.open("GET",obj[i].objLink,true);		 
					}
					else if (typeof XDomainRequest != "undefined") 
					{
						
						var xmlhttp = new XDomainRequest();
						xmlhttp.withCredentials =true;
						
						xmlhttp.onload = afterStyle(obj[i]);
						xmlhttp.onerror = function () {console.log("ERR"); };
						xmlhttp.ontimeout = function () { };
						xmlhttp.onprogress = function () { };
						xmlhttp.timeout = 0;
						
						var sendSetTimeout = 200;
						 xmlhttp.open("GET",obj[i].objLink,true);
						
						setTimeout(function () {
							
						}, sendSetTimeout);
					} 
				}
			
				else
				{
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
					xmlhttp.onload = afterStyle(obj[i]);	
					xmlhttp.open("GET",obj[i].objLink,true);
				}	
				xmlhttp.send();
			}
		}
	};

	afterStyle = function(obj) {
				return function() {

						if(obj.objType=="link")
						{
							
							localStorage[obj.objLink] = this.responseText;
							
							addToLsCookie("ls_Vers",obj.objLink);
						}
						if(obj.objType=="script")
						{
							
							localStorage[obj.objLink] = this.responseText;
							
							addToLsCookie("ls_Vers",obj.objLink);
						}								
				};				
		};
	
	//Orphan functions
	function headInject(obj,objparam,objType){

		
		if(checkPropAvailable(obj,objparam))
		{
			if(objType == 'script')
			{
				var scr1 = document.createElement(objType);	
				scr1.type="text/javascript";
				try{
					scr1.innerHTML = obj[objparam];
				}catch(e){
						scr1.text = obj[objparam];
				}
				document.getElementsByTagName("head")[0].appendChild(scr1);
			}
			else if(objType == 'style' || objType == 'link')
			{
				
				try
				{
			
					document.getElementById("LS").innerHTML = document.getElementById("LS").innerHTML + obj[objparam];	
				}
				catch(e)
				{
					document.getElementById("LS").styleSheet.cssText = document.getElementById("LS").styleSheet.cssText + obj[objparam];
				}
			}
		}
		else{
			dynamicLoadAndLateAjax(obj,objparam,objType);
		}
		
		
	}

	function dynamicLoadAndLateAjax(obj,objparam,objType){
		
		var scr1 = document.createElement(objType);	
		if(objType == "link" || objType == "style")
		{
			scr1.type = "text/css";
			scr1.rel = "stylesheet";
			scr1.href = objparam;
		}
		else if(objType == "script")
		{
			scr1.type = "text/javascript";
			scr1.src = objparam;
		}
		document.getElementsByTagName("head")[0].appendChild(scr1);
		//window.onload = loadXMLDoc([new LsObject(objparam,objType,true)],0);
		addEvent(window, "load", loadXMLDoc([new LsObject(objparam,objType,true)],0));
	}


	function checkPropAvailable(obj,objProp){
		if(obj[objProp] != undefined && obj[objProp] != "" && obj[objProp] != null && obj[objProp] != "null")
		{
			return true;
		}else return false;
	}



	//Functionalities of dLS Class
	this.initLS = function(){
		
		deleteExpired();
		checkDependencies();
		//For loading from cookies
		loadCookieData(dataLsObjects);

		var preDwnldIndex = LsObject.countObj;
		
		//load LSInjecter for already downloaded scripts
		loadRawData(dataLsObjects);

		// window.onload = loadXMLDoc(dataLsObjects,preDwnldIndex);
		addEvent(window, "load", loadXMLDoc(dataLsObjects,preDwnldIndex));
	};

	var deleteExpired = function(){
		if((getLsCookie("ls_Del")).length==0)
		{
			var ls_Expired = [];
		}
		else{
			var ls_Expired = (getLsCookie("ls_Del")).split(",");	
		}
	
		for(var i=0;i<ls_Expired.length;i++)
		{
			delete localStorage[ls_Expired[i]];
			
		}
		deleteFromCookie("ls_Vers","ls_Del");

	};

	var checkDependencies = function(){

		if(!document.getElementById("LS"))
		{
			var newStyle = document.createElement("style");
			newStyle.id = "LS";
			document.getElementsByTagName("head")[0].appendChild(newStyle);	
		}
	};
	
	this.toString = function(){
		console.log("Total number of lsObjects: " + dataLsObjects.length);
		for(var i = 0; i<dataLsObjects.length ; i++)
		{
			console.log( '	[ScriptType] - ' + (dataLsObjects[i].objType) + '		[Location] - '  + dataLsObjects[i].objLink  +'			[Id] - ' + dataLsObjects[i].objId );
		}
	};
	
	var loadCookieData = function(lsObjects){
		//load items already in LS and headInject them
		if((getLsCookie("ls_Fetch")).length==0)
		{
			var ls_Load = [];
		}
		else{
			var ls_Load = (getLsCookie("ls_Fetch")).split(",");	
		}
		
		for(var i=0; i<(ls_Load.length); i++)
		{
			if(ls_Load[i].slice(-2) == "ss")
			{
				var typeIt = "link";
			}
			else
			{
				var typeIt = "script";
			}
			lsObjects[LsObject.countObj] = new LsObject(ls_Load[i],typeIt);
			headInject(localStorage,ls_Load[i],typeIt);
		}
		
	};

	//Load StyleSheet, Script href and src from data attributes and put these in Class Objects
	var loadRawData = function(lsObjects){
		//These two objects to be dereferenced for storage performance
		//Query String to be used
		var domObjs = [];
		domObjs[0] = document.getElementsByTagName("script");
		domObjs[1] = document.getElementsByTagName("link");
		for(var j=0;j<domObjs.length;j++)
		{
			for(var i=0;i<domObjs[j].length;i++)
			{			
				//if((domObjs[j][i].className != "") && (typeof(domObjs[j][i].className) != 'undefined'))
				if((domObjs[j][i].className == "dscript") || (domObjs[j][i].className == "dlink"))
				{
					lsObjects[LsObject.countObj] = new LsObject((domObjs[j][i].src) || (domObjs[j][i].href), domObjs[j][i].tagName.toLowerCase());
				}				
			}	
		}
	};

	//Churn all data
	var churnData = function(lsObjects, startIndex){
		for(var i=startIndex;i<lsObjects.length;i++)
		{
			addEvent(window, "load", loadXMLDoc(lsObjects[i]))
		}
	};

	//Float the Public Object to the Global space referenced by 'dLS'
	
	return this;

}).call({});
if(typeof(Storage) !== "undefined"){dLS.initLS();}


