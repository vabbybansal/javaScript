
/*
	The Orderite - native JS
	For disabling the animations, init window['timeWant'] = 0, at the end of the file where the comment is specified
*/


var theOrderite = (function(){

	var model = {
		currentRecord:{}, 				// Object with the AJAX Data - remains Constant
		currentSeq:[],					// Array of the current sorting order relative to the currentRecord index
		currentFilArr:[],				// Resultant array after applying the latest filter. UI Changes to be made next
		lastFilArr:[],					// last state of resultant array(prev value of currentFilArr). currentFilArr and lastFilArr sent to the rendering function to make changes whatsoever
		tempFilter:[],					// Latest array consisting the various filters currently applied.
		tempArr:[],
		appCnstns:{
			dataFileSrc:'data/FrontEndProblem1.json',
			mainDiv:"theOrderite"
		}
	};

	// The Controller having all the API's and model handling functions 
	var controller = {

		//Initialize the app
		init:function(){

			//Load json data from the server file
			this.getAjaxData();		
			view.addListeners();

			//Some Array functions necessary for the code
			Array.prototype.deepCopy = function(){
				return this.slice(0);
			}
			Array.prototype.rem = function(remElm){
							var index = this.indexOf(remElm);
							if (index > -1) {
							    this.splice(index, 1);
							}
						}
		// Init the below value as 0 for non animating look [without any delay] -> window['timeWant'] = 0
			if(window['timeWant'] == 0)
			{
				
					var ele = document.getElementById("theOrderite");
					ele.className = ele.className + " noDelay";
				
			}
		},
		//Function to normalize the JSON so that JSON.parse does not throw any error. The JSON provided had an escape character error
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
		//Load JSON DATA in vanila JS
		getAjaxData:function(){
			var xhr = new XMLHttpRequest();
			xhr.open('POST',encodeURI(model.appCnstns.dataFileSrc));
			xhr.onload = function(){
				if(xhr.status === 200){
					var normalJSON = controller.stringNormalizeJSON(xhr.responseText);
					//Update the basic model
					model.currentRecord = JSON.parse(normalJSON);
					//Update the UI ASAP
					view.updateUIRecords(model.currentRecord);
					//Update the other data used in the app later on
					controller.updateStatData();
					xhr = null;
				}
				else{
					alert('Request Failed. Status - ' + xhr.status);
				}
			};
			xhr.send();
		},
		//Init the static data once 
		updateStatData:function(){

			var dataObj = model.currentRecord;
			var dataObjLen = model.currentRecord.length;
			for(var i=0; i<dataObjLen; i++)
			{		
				model.lastFilArr[i] = i;
				//normalize the paymentstatus property to be used later on
				dataObj[i].paymentStatus = dataObj[i].paymentStatus.toLowerCase(); 
				dataObj[i].index = i;
				model.tempArr[i] = i;
			}
			//model.currentSeq is the actual sorted Object being used in the app repeatedily
			model.currentSeq = dataObj.deepCopy();
		},
		// Apply filters to the app, called from the view
		filterArr:function(criteria,add){
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
				tempFilter.rem(criteria);
			}


			if(tempFilter.length)
			{
				var tempFilterLen = tempFilter.length;

				for(var i=0; i<len; i++)
				{
					for(var j=0; j<tempFilterLen; j++)
					{

						if(dataSeq[i].paymentStatus === tempFilter[j])
						{
							arr.push(i);
							break;
						}
					}
				}	
			}
			else
			{
				arr = model.tempArr.deepCopy();
			}
			
			model.currentFilArr = arr;
			// Call the rendering function
			view.renderUpdates();

		},
		// The sorting method
		sortingArr : function(sortMethod){
			var sortFn;
			if(sortMethod == 'paymentId' || sortMethod == 'amount')
			{
				sortFn = function(a,b){return (a[sortMethod] - b[sortMethod]);}
			}
			else if(sortMethod == "orderDate")
			{
				sortFn = function(a, b){ var dateA=new Date(a.orderDate), dateB=new Date(b.orderDate);
					return dateA-dateB;};
			}
			// Call the Array.sort by passing the above comparitor functions
			model.currentSeq.sort(sortFn);
			// Update the whole sequence again in the UI
			view.updateUIRecords(model.currentSeq)
			// Recheck the filters again
			controller.filterArr();
			//Update the UI
			view.renderUpdates('sort')
		}
	};

	var view = {
		//Update the sorting and initial HTMLization in a fast manner
		updateUIRecords:function(dataObj){
			var dataObjLen = dataObj.length;
			var dataTable = document.getElementById(model.appCnstns.mainDiv);
			var recordHTML = "<table id='dataTable'><tr><th>Seq</th><th>Payement Id</th><th>Order Date</th><th>Merchant Id</th><th>Customer Email</th><th>Amount</th><th>Payment Status</th></tr>";
			for(var i=0; i<dataObjLen; i++)
			{
				recordHTML += "<tr><td>"+ (i+1) + "</td><td>" + dataObj[i].paymentId  + "</td><td>" + dataObj[i].orderDate + "</td><td>" + dataObj[i].merchatId + "</td><td>" + dataObj[i].customerEmail + "</td><td>" + dataObj[i].amount + "</td><td>" + dataObj[i].paymentStatus + "</td></tr>";
			}
			recordHTML += "</table>";
			dataTable.innerHTML = recordHTML;
			
		},
		// Attach the view eventListeners
		addListeners:function(){
			document.getElementById("_filDelegate").addEventListener("click",this.clickHandle);
			document.getElementById("_sortDelegate").addEventListener("click",this.clickHandle);

		},
		// CheckBox and Radio clicks delegated to the respective dropdown parent - This is the common handler to both types of events
		clickHandle:function(event){
			var targetElm;
			var sortFn;

			//normalize the target
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
					targetElm.checked = true;

				}
			}

			if(targetElm.name === "criteria")
			{
				// Call filter
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
				// Call Sorting
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
		// The rendering function called on filters and sorts
		renderUpdates:function(sort){
				var lastArr = model.lastFilArr;

				if(sort === 'sort')
				{
				
					lastArr=model.tempArr.deepCopy();
				
					
				}
				var currentArr = model.currentFilArr;
				var totalLen = model.currentSeq.length;
				var currLen = currentArr.length;
				var lastLen = lastArr.length;
				var temparr=[];
				for(var j=0; j<currLen; j++)
				{
					lastArr.rem(currentArr[j])
				}

				console.log(currentArr + " -- " + lastArr + " -- " );
				lastLen = lastArr.length;
				currLen = currentArr.length;
				var trs = document.querySelectorAll("#dataTable tr");
				var timeWant = window['timeWant'];
				

				// The Animations on the table tr's
				for(var i=0; i<currLen; i++)
				{
					// trs[currentArr[i]+1].style.display = "table-row"
					setTimeout((function(x){
						return function(){
							// trs[x].style.display = "table-row";
							trs[x].style.display = "table-row";
							setTimeout(function(){
								trs[x].className = "aniShow";
							},50 * timeWant)
						}
					})(currentArr[i]+1),100 * timeWant * i);
					
				}
				for(var k=0; k<lastLen; k++)
				{
					// trs[lastArr[k]+1].style.display = "none";
					setTimeout((function(x){
						return function(){
							// trs[x].style.display = "none";
							trs[x].className = "aniHide";
							setTimeout(function(){
								trs[x].style.display = "none";
							},300 * timeWant);


						}
					})(lastArr[k]+1),k*100 * timeWant)
					
				}
			// Update Model
			model.lastFilArr = model.currentFilArr.deepCopy();
		}

	};
	
	
	// Init the below value as 0 for non animating look [without any delay]
	window['timeWant'] = 1;

	controller.init();

	// Init the 'theOderite' Global Object
	this.model = model;
	this.controller = controller;
	this.view = view;
	return this;

}).call({});


