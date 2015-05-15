var theOrderite = (function(){

	var model = {
		currentRecord:{}, 				// Object with the AJAX Data
		// paymntIdStatArr:[],
		// amntIdStatArr:[],
		// dateIdStatArr:[],
		currentSeq:[],					// Index array of the current sorting order relative to the currentRecord index
		currentFilArr:[],				// Resultant array after applying the latest filter. UI Changes to be made next
		lastFilArr:[],					// last state of resultant array(prev value of currentFilArr). currentFilArr and lastFilArr sent to the rendering function to make changes whatever
		tempFilter:[],					// Latest array consisting the various filters currently applied. 
		// currentStatus:{
		// 	filter:0,
		// 	sort:0
		// },
		appCnstns:{
			dataFileSrc:'data/FrontEndProblem1.json'
		}
	};

	var controller = {
		init:function(){
			this.getAjaxData();
			view.addListeners();
			Array.prototype.deepCopy = function(){
				return this.slice(0);
			}
		},
		stringNormalizeJSON:function(xhrOut){
			return xhrOut.replace(/'/g,"\"")
			   .replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f")
               .replace(/[\u0000-\u0019]+/g,"");
		},
		getAjaxData:function(){
			var xhr = new XMLHttpRequest();
			xhr.open('GET',encodeURI(model.appCnstns.dataFileSrc));
			xhr.onload = function(){
				if(xhr.status === 200){
					var normalJSON = controller.stringNormalizeJSON(xhr.responseText);
					model.currentRecord = JSON.parse(normalJSON);
					view.updateUIRecords(model.currentRecord);
					controller.updateStatData();
					xhr = null;
				}
				else{
					alert('Request Failed. Status - ' + xhr.status);
				}
			};
			xhr.send();
		},
		updateStatData:function(){
			var dataObj = model.currentRecord;
			var dataObjLen = model.currentRecord.length;
			for(var i=0; i<dataObjLen; i++)
			{
				// model.paymntIdStatArr[i] = dataObj[i].paymentId;
				// model.amntIdStatArr[i] = dataObj[i].amount;
				// model.dateIdStatArr[i] = dataObj[i].orderDate;
				model.currentSeq[i] = i;
				model.lastFilArr[i] = i;
				dataObj[i].paymentStatus = dataObj[i].paymentStatus.toLowerCase(); 
			}
		},
		filterArr:function(criteria,add){
			
			var data = model.currentRecord;
			// var len = data.length;
			var dataSeq = model.currentSeq;
			var len = dataSeq.length;
			tempFilter = model.tempFilter;
			var arr = new Array();


			if(add)
			{
				tempFilter.push(criteria);
			}
			else
			{
				var index = tempFilter.indexOf(criteria);
				if (index > -1) {
				    tempFilter.splice(index, 1);
				}
			}
			if(tempFilter.length)
			{
				var tempFilterLen = tempFilter.length;

				for(var i=0; i<len; i++)
				{
					for(var j=0; j<tempFilterLen; j++)
					{

						if(data[dataSeq[i]].paymentStatus === tempFilter[j])
						{
							arr.push(dataSeq[i]);
						}
					}
				}	
			}
			else
			{
				arr = dataSeq.deepCopy();
			}
			
			
			model.currentFilArr = arr;
			this.renderUpdates();

		},
		sortingArr : function(sortMethod){
			console.log(sortMethod);
		},
		renderUpdates:function(){
			console.log(model.lastFilArr + " - " + model.currentFilArr)
			model.lastFilArr = model.currentFilArr.deepCopy();

		}

	};

	var view = {
		updateUIRecords:function(dataObj){
			var dataObjLen = dataObj.length;
			var dataTable = document.getElementById("theOrderite");
			var recordHTML = "<table id='dataTable'><tr><th>Seq</th><th>Payement Id</th><th>Order Date</th><th>Merchant Id</th><th>Customer Email</th><th>Amount</th><th>Payment Status</th></tr>";
			for(var i=0; i<dataObjLen; i++)
			{
				recordHTML += "<tr><td>"+ (i+1) + "</td><td>" + dataObj[i].paymentId  + "</td><td>" + dataObj[i].orderDate + "</td><td>" + dataObj[i].merchatId + "</td><td>" + dataObj[i].customerEmail + "</td><td>" + dataObj[i].amount + "</td><td>" + dataObj[i].paymentStatus + "</td></tr>";
			}
			recordHTML += "</table>";
			dataTable.innerHTML = recordHTML;
		},
		addListeners:function(){
			document.getElementById("_filDelegate").addEventListener("click",this.clickHandle);
			document.getElementById("_sortDelegate").addEventListener("click",this.clickHandle);

		},
		clickHandle:function(event){
			var targetElm;
			
			if(event.target.nodeName === 'INPUT')
			{
				targetElm = event.target;
			}
			else
			{
				targetElm = event.target.children[0];
				if(targetElm.type === "checkbox")
				{
					targetElm.checked = !targetElm.checked;
				}
				else
				{
					// alert("asd")
					targetElm.checked = true;

				}
			}

			if(targetElm.name === "criteria")
			{
				if(targetElm.checked === true)
				{
					controller.filterArr(targetElm.value,1);
				}
				else
				{
					controller.filterArr(targetElm.value,0);
				}
			}
			else
			{
				if(targetElm.checked === true)
				{
					controller.sortingArr(targetElm.value);
				}
				else
				{
					controller.sortingArr(targetElm.value);
				}
			}
		},
		renderUpdates:function(){

		}

	};

	controller.init();


	this.model = model;
	this.controller = controller;
	this.view = view;
	return this;

}).call({});