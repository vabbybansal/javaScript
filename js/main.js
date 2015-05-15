var theOrderite = (function(){

	var model = {
		currentRecord:{},
		appCnstns:{
			dataFileSrc:'data/FrontEndProblem1.json'
		}
	};

	var controller = {
		init:function(){
			this.getAjaxData();
		},
		stringNormalizeJSON:function(xhrOut){
			return xhrOut.replace(/'/g,"\"");
		},
		getAjaxData:function(){
			var xhr = new XMLHttpRequest();
			xhr.open('GET',encodeURI(model.appCnstns.dataFileSrc));
			xhr.onload = function(){
				if(xhr.status === 200){
					var normalJSON = controller.stringNormalizeJSON(xhr.responseText);
					model.currentRecord = JSON.parse(normalJSON);
					// view.updateUIRecords(model.currentRecord);
					xhr = null;
				}
				else{
					alert('Request Failed. Status - ' + xhr.status);
				}
			};
			xhr.send();
		}

	};

	var view = {
		updateUIRecords:function(){
			
		}
	};

	controller.init();


	this.model = model;
	this.controller = controller;
	this.view = view;
	return this;

}).call({});