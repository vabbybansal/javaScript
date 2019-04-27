<?php

	$dir    = 'upload';
	$files1 = array_diff(scandir($dir),array('..','.'));
	// foreach($files1 as $imgSrc)
	// {
	// 	echo '<div>
	// 			<img src="upload/' . $imgSrc . '" />
	// 			<div>' . $imgSrc . '</div>
	// 		</div>';
	// }
	print json_encode($files1);
?>