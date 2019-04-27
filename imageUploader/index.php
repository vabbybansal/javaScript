<!DOCTYPE html>
<html>
<head>
<title></title>
<style>
	*{padding:0;margin:0;box-sizing:border-box;}
	.container{font-family: verdana,arial, sans-serif;color:#000;width:990px;margin:auto;}
	.imgUploader{width:99.999%;margin:auto;height:600px;margin:10px;padding:3px;background-color:black;}
	.imgUploader>div{display:inline-block;vertical-align:top;height:100%;}
	.imgUploader{border:1px solid #051A38;}
	.uploadArea{background-color:#70A9FD;padding:10px;width:30%;}
	.label{text-align:center;font-size:25px;}
	.uploadArea>form{margin-top:10px;}
	.uploadArea input[type='file']{width:90%;display:block;margin:auto;}
	.imgGallery{background-color:#C6DDFF;width:69%;position: relative;top: 0px;left: 11px;border: 4px solid black;overflow:auto;}
	.fileButton{display:block;width:90%;padding:10px 20px;background-color:#FFD73C;color:black;text-align:center;margin:20px auto;border:1px solid black;cursor:pointer;position:relative;font-size:20px;}
	.fileButton>div{font-size:12px;margin-top:3px;overflow:hidden;text-overflow:ellipsis;}
	#fileValue{overflow:hidden;}
	#uploadimage input[type='file']{display:none;}
	#uploadimage input[type='submit']{width:90%;display:block;margin:auto;padding:10px 20px;background-color:#FF893C;border:1px solid black;cursor:pointer;outline:0;}
	.btn{position:relative;}
	.film{float:left;}
	.progressBar{width:90%;margin:auto;background-color:black;margin-top:10px;padding:2px;display:none;}
	.progress{height:2px;background-color:white;width:0px;}
	.loopBack{text-align:center;}
	.imgUp>img{max-width:80%;max-height:100px;border:1px solid black;}
	.loopBack{margin-top:10px;}
	.fileName{font-size:12px;}
	.film>div{width:150px;height:110px;float:left;margin:5px;text-align:center;border:1px solid #999;padding:4px;position:relative;}
	.film>div>img{max-width: 92%;max-height: 68%;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;}
	.film>div>div{font-size:12px;text-align:center;position:absolute;bottom:0;left:0;right:0;height:15px;text-overflow:ellipsis;overflow:hidden;}
	.clr.clr{clear:both;float:none;height:0px;border:0px;}
	.imgMsg{font-size:13px;width:90%;margin:auto;}
</style>

</head>
<body>

	<div class="container">
		<div class="imgUploader">
			<div class="uploadArea">
				<div class="label">Upload Image</div>
				<form id="uploadimage" action="" method="post" enctype="multipart/form-data" novalidate>
					<div id="fileDrag">
						
					</div>
					<div class="fileButton btn">
						<span>Select File</span>
						<div class="imgUp"></div>
					</div>
					<input type="file" name="file[]" id="file" required multiple/>
					<input type="submit" value="Upload" class="submit btn" name="submit"/>

				</form>
				
				<div class="loopBack">
					
					<div class="imgMsg">
						
					</div>
					<div class="progressBar">
						<div class="progress"></div>
					</div>
				</div>
			</div>
			<div class="imgGallery">
				<div class="label">Image Gallery</div>
				<div class="film">
					<?php

						$dir    = 'upload';
						$files1 = array_diff(scandir($dir),array('..','.'));
						foreach($files1 as $imgSrc)
						{
							echo '<div>
									<img src="upload/' . $imgSrc . '" />
									<div>' . $imgSrc . '</div>
								</div>';
						}
					?>
					<!-- <div class="clr"></div> -->
				</div>
			</div>
		</div>		

	</div>





<div id="zomi"></div>
<div id="message"></div>
<script src="js/jqueryDev.js"></script>
<script src="js/main.js"></script>
</body>
</html>