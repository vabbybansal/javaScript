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
						"http://192.168.38.31/lsvb/builder-section-1.css"	,
						"http://192.168.38.31/lsvb/builder-section-2.css"	,
						"http://192.168.38.31/lsvb/jquery-1.9.1.js"
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
	$requireNow = array();
	$readyInLS = array();
	

	foreach($require as $key => $val)
	{		
		
		
		$found = array_search($val, $cookie_Array);

		if($found === false)
		{
			array_push($requireNow,$val);
			unset($require[$key]);
			$del = 1;
		}
		else{
			array_push($readyInLS,$val);
			unset($require[$key]);
			unset($cookie_Array[$found]);
			}
	}
	
	
	
	
	if($del==1 || (sizeof($cookie_Array2) != sizeof($require2)))
	{
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

?>

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