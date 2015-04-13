<!DOCTYPE html>
<html>
<head>
	<?php 
	

	function arrayToString($x)
	{
		if(empty($x))
		{
			return "empty";
		}
		else
		{
			return implode(",",$x);
		}
	}
	$require = array(
						"http://192.168.38.12/lsvb/builder-section-1.css"	,
						"http://192.168.38.12/lsvb/builder-section-2.css"	,
						"http://192.168.38.12/lsvb/jquery-1.9.1.js"
					);
	$require2 = $require;
	$del = 0;
	
	if(!isset($_COOKIE["ls_Vers"]))
	{
		$cookie_LS = "";
	}
	else{
		$cookie_LS = $_COOKIE["ls_Vers"];	
	}
	
	$cookie_Array = explode(",",$cookie_LS);
	$cookie_Array2 = $cookie_Array;	
	$requireNow = array(); //Array for storing elements to be httpRequested now and cached in JS Local Storage
	$readyInLS = array();
	
// $require = array("a","b","d");
// $cookie_Array = array("a","b","c","d");

	foreach($require as $key => $val)
	{		
		
		
		$found = array_search($val, $cookie_Array);

		if($found === false)
		{
			array_push($requireNow,$val);
			unset($require[$key]);
			// if(substr($val, -2, 2) == "ss")
			// {
			// 	echo "<link rel='stylesheet' type='text/css' class='dlink' href=".$val." />";
			// }
			// else
			// {
			// 	echo "<script src=".$val." class='dscript'/></script>";	
			// }
			$del = 1;
			//break;
		}
		else{
			array_push($readyInLS,$val);
			unset($require[$key]);
			unset($cookie_Array[$found]);
			// <script>ls.calll()</script>
		}
	}
	
	
	
	
	if($del==1 || (sizeof($cookie_Array2) != sizeof($require2)))
	{
		echo "<br />";
		print_r($cookie_Array2);
		echo "<br />";
		print_r($require2);
		foreach($require2 as $key => $val)
		{		
		
			if(substr($val, -2, 2) == "ss")
			{
				echo "<link rel='stylesheet' type='text/css' class='dlink' href=".$val." />";
			}
			else
			{
				echo "<script src=".$val." class='dscript'/></script>";	
			}
			
		}
		setcookie("ls_Fetch","empty",time()+3600);
		setcookie("ls_Del",arrayToString($cookie_Array2),time()+3600);
	}
	else{
		setcookie("ls_Fetch",arrayToString($readyInLS),time()+3600);
		setcookie("ls_Del","empty",time()+3600);

	}

	
		// echo "<br /> requireNow - ";
		// print_r ($requireNow);
		// echo "<br /> readyInLS - ";
		// print_r ($readyInLS);
		
		// echo "<br /> cookie_Array - ";
		// print_r ($cookie_Array);
		// echo "<br />....................................";

	

?>

<!-- MY PHP HANDLING -->

<!-- <link rel="stylesheet" id="style1" class="dlink" data-src='https://dl.dropboxusercontent.com/u/80195310/style1.css' type="text/css" media="all" /> -->
<!-- <link rel="stylesheet" id="style2" class="dlink" data-src='https://dl.dropboxusercontent.com/u/80195310/style2.css' type="text/css" media="all" /> -->
<!-- <script type="text/javascript" id="jq" class="dscript" data-src="https://dl.dropboxusercontent.com/u/80195310/jq1.js"></script> -->

<!-- STYLESHEETS TO BE PUT INTO LOCAL STORAGE -->

<!-- <link rel="stylesheet" id="animate" class="dlink" data-src='animate.css' type="text/css" media="all" /> -->

<!-- SCRIPTS TO BE PUT INTO LOCAL STORAGE -->

<!-- <script type="text/javascript" id="pace" class="dscript" data-src="pace.min.js"></script>
<script type="text/javascript" id="slider4" class="dscript" data-src="slider4.js"></script>
<script type="text/javascript" id="slider5" class="dscript" data-src="slider5.js"></script>
<script type="text/javascript" id="slider6" class="dscript" data-src="slider6.js"></script>
<script type="text/javascript" id="slider7" class="dscript" data-src="slider7.js"></script> -->


</head>



<body>

<div style="background-color:#272822;color:#F8F8F2;">


</div>

<div>
<img id="ios-srp" class="myLsImg" type="imgLs" data-src="http://192.168.38.133/lsbg/1.Jpg" />


</div>
<div style="clear:both"></div>

<div class="xidHpBp">Test
	
</div>

<div id="testConsole"></div>
<script src="libraryLs.js"></script>
<script type="text/javascript">



</script>

<script type="text/javascript">




	
</script>

</body>
</html>