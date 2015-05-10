var imgGalApp = (function(){

			var model = {
				appStatic:{
					btnClass:'.btn',
					fileBtn:'.fileButton',
					inputFileElm:'#uploadimage input[type=file]',
					imgUploadAr:'.imgUp',
					progElemClass:'.progressBar',
					formId:'#uploadimage',
					ajaxProcessPage:'ajax_php_file.php',
					serverCheckPage:'serverCheck.php'
				},
				currentFiles:[],
				currentGal:[]
			};

			var view = {
				init:function(statData){
					
				//Artificial button click behaviour
					$(statData.btnClass).on("click",function(){
						$(this).css({"top":"1px","left":"1px"});
						var that = $(this);
						setTimeout(function(){
							that.css({"top":"0px","left":"0px"});
						},30);
					});

				//File Button Click Handling
					$(statData.fileBtn).on("click",function(){
						$(statData.inputFileElm)[0].click();
					});
				//Input Type File Onchange Event
					$(statData.inputFileElm).on("change",function(){
						var fileArr = $("input[type='file']")[0].files;
						controller.setCurrentFiles(fileArr);
						view.renderPreUpload(fileArr,statData);
					});
				//Submit Button Ajax Init
					$(statData.formId).on('submit',(function(e) {

						// $(progElemClass).find("div").css("width","0px");
						e.preventDefault();

						if(controller.checkSubmitCondition())
						{
							$.ajax({
								url: statData.ajaxProcessPage, // Url to which the request is send
								type: "POST",             // Type of request to be send, called as method
								data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
								contentType: false,       // The content type used when sending data to the server.
								cache: false,             // To unable request pages to be cached
								processData:false,        // To send DOMDocument or non processed data file it is set to false
								success: function(data)   // A function to be called if request succeeds
										{
											//add to gallery the images which throw 1
											var normalizedStr = data.replace(/ /g, "");
											var filteredFileArr = controller.filterFilesToGal(normalizedStr);
											var arrLen = filteredFileArr.length;
											var fileHTML = "";
											for(var i=0;i<arrLen;i++)
											{
												var fileName = filteredFileArr[i];
												fileHTML += "<div><img src='upload/" + fileName + "' /><div class='fileName'>"+ fileName +"</div></div>";
												controller.updateClientGal(fileName);
											}
											$(".film").append(fileHTML);
											var remains = normalizedStr.length - arrLen;
											$(".imgMsg").html(arrLen + " files updated to Gallery." + remains + " files either existed or not images." );

										},
								xhr: function(){
								       // get the native XmlHttpRequest object
								       var xhr = $.ajaxSettings.xhr() ;
								       // set the onprogress event handler
								       xhr.upload.onprogress = function(evt){ 
								       		// console.log('progress', evt.loaded/evt.total*100) 
								       		$(statData.progElemClass).show().find("div").css("width",evt.loaded/evt.total*100);
								       } ;
								       // set the onload event handler
								       xhr.upload.onload = function(data){ 
								       		 $(statData.progElemClass).find("div").css("width","100%");
								       		 setTimeout(function(){
								       		 	$(statData.progElemClass).find("div").css("width","0px");
								       		 	$(statData.progElemClass).hide();
								       		 },100);
								       	 } ;
								       // return the customized object
								       return xhr ;
								   }
								
							});
						}

					}));

				},
				renderPreUpload:function(fileArr,statData){
					var fileHTML="";
					var len = fileArr.length;
					if(len > 1)
					{
						fileHTML = len + " images selected"
					}
					else if(len === 1)
					{	
						fileHTML = fileArr[0].name;
					}
					else
					{
						fileHTML = "";
					}
					$(statData.imgUploadAr).html(fileHTML);
				}
				
			};

			var controller = {
				init:function(){
					view.init(model.appStatic);
					this.checkServer();
					this.populateGal();
				},
				setCurrentFiles:function(filesArr){
					model.currentFiles = filesArr;
				},
				checkSubmitCondition:function(){
					return((model.currentFiles.length >= 1) ? 1 : 0)
				},
				filterFilesToGal:function(ajaxRes){
					var filteredArr = [];
					for(var i=0;i<ajaxRes.length;i++)
					{
						if(ajaxRes[i] === '1')
						{
							filteredArr.push(model.currentFiles[i].name);
						}
					}
					return filteredArr;
				},
				checkServer:function(){

					$.ajax({
						url: model.appStatic.serverCheckPage, // Url to which the request is send
						type: "POST",  
						dataType:"json",           // Type of request to be send, called as method
						contentType: false,       // The content type used when sending data to the server.
						cache: false,             // To unable request pages to be cached
						processData:false,        // To send DOMDocument or non processed data file it is set to false
						success: function(data)   // A function to be called if request succeeds
								{
									//add to gallery the images which throw 1
									
									// for(var i=0;i<data.length)
									for(var img in data)
									{
										var isThere = 0;
										//(data[img]);
										for(var i=0;i<model.currentGal.length;i++)
										{
											if(data[img]===model.currentGal[i])
											{
												isThere=1;
											}

										}
										if(isThere === 0)
										{
											model.currentGal.push(data[img]);
											$(".film").append('<div><img src="upload/' + data[img] + '" /><div>' + data[img] + '</div></div>');
										}
									}
								}
						
					});
					setTimeout(controller.checkServer,10000);
				},
				populateGal:function(){
					$(".film img").each(function(){
						model.currentGal.push($(this).attr('src').replace('upload/',""));
					});
				},
				updateClientGal:function(fileName){
					model.currentGal.push(fileName);
				}
			};

			controller.init();
			

			this.model = model;
			this.controller = controller;
			this.view = view;
			return this;
		}).call({});