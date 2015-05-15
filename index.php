<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>The Orderite</title>
	<link rel="stylesheet" href="css/main.css" type="text/css" />
</head>
<body>	
	
	<div class="container">
		<div id="controlPanel">
			<div class='filters lf cf'>
				<div>Filters</div>
				<div id="_filDelegate">
					<div><input type="checkbox" name="criteria" value="initiated"> Initiated</div>
					<div><input type="checkbox" name="criteria" value="failed"> Failed</div>
					<div><input type="checkbox" name="criteria" value="success"> Success</div>
					<div><input type="checkbox" name="criteria" value="refunded"> Refunded</div>
					<div><input type="checkbox" name="criteria" value="dropped"> Dropped</div>
				</div>
			</div>
			<div class='sorting lf cf'>
				<div>Sorting</div>
				<div id="_sortDelegate">
					<div><input type="radio" name="sorting" value="paymentId"> Payment Id</div>
					<div><input type="radio" name="sorting" value="orderDate"> Order Date</div>
					<div><input type="radio" name="sorting" value="amount"> Amount</div>
					<!-- <div><input type="radio" name="sorting" value="refunded"> Refunded</div>
					<div><input type="radio" name="sorting" value="dropped"> Dropped</div> -->
				</div>
			</div>
		</div>
		<div id="theOrderite">
			
		</div>
	</div>

	
	<script src="js/main.js"></script>
</body>
</html>