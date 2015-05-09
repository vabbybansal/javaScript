<?php
// if(isset($_FILES["file"]["type"]))
// {
//     $validextensions = array("jpeg", "jpg", "png");
//     $temporary = explode(".", $_FILES["file"]["name"]);
// $file_extension = end($temporary);
// if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")
// ) && ($_FILES["file"]["size"] < 100000)//Approx. 100kb files can be uploaded.
// && in_array($file_extension, $validextensions)) {
// if ($_FILES["file"]["error"] > 0)
// {
// echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
// }
// else
// {
// if (file_exists("upload/" . $_FILES["file"]["name"])) {
// echo $_FILES["file"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
// }
// else
// {
// $sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
// $targetPath = "upload/".$_FILES['file']['name']; // Target path where file is to be stored
// move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
// echo "<span id='success'>Image Uploaded Successfully...!!</span><br/>";

// }
// }
// }
// else
// {
// echo "<span id='invalid'>***Invalid file Size or Type***<span>";
// }
// }





    function checkFileExists($fileObj){
        if(file_exists($fileObj))
        {
            return 3;
        }
        else
        {
            return 1;
        }
    }
    function checkBasicReqs(&$fileObject){
        if(isset($_POST["submit"]))
        {
            $checkSize = getimagesize($fileObject);
            if($checkSize !== false)
            {
                return 1;
            }
            else
            {
                return 2;
            }
        }
        else
        {
            return 0;
        }
    }
//$_FILES["file"]["tmp_name"]
    
    // $dummy_okupload = 0;
    // $imageFileType = pathinfo($targetFile, PATHINFO_EXTENSION);
    //Check if Actual Image
    // function finalizeMsg($numericCode){
    //     switch ($numericCode){
    //         case 0:
    //             return "Form not Submitted";
    //             break;
    //         case 2:
    //             return "Not an Image";
    //             break;
    //         case 3:
    //             return "File Exists";
    //             break;
                // case 5 - fatal error
                // case 1- success

    //         default:
    //             return "Unknown Error";
    //     }
    // }
    function theController($indexFile){

        // $fileArray = ;
        // print_r($_FILES['file']['name'][0]);
        // $zozuu = "";
        // for($i = 0; $i < sizeof($fileArray); $i++)
        // {
        //     $zozuu =  $zozuu . $fileArray[$i];
        // }
        // print_r $_FILES['file']['name'];




        // for($i=0; $i<count($_FILES['file']['name']);$i++)
        // {

        // }




        // //Check Basic Requirements && FileExists
        $fileFormLabel = "file";
        $targetDir = "upload/";
        $targetFile = $targetDir . basename($_FILES[$fileFormLabel]["name"][$indexFile]);
        $finalMessage = "orig";
        
        if(initChecks($finalMessage, $fileFormLabel, $targetFile, $indexFile))
        {
            //File seems to be a valid image... Trying moving/uploading the file
            if(move_uploaded_file($_FILES[$fileFormLabel]["tmp_name"][$indexFile], $targetFile))
            {
                return 1;
            }
            else
            {
                return 5;
            }
        }
        else
        {
            return $finalMessage;
        }
    }
    function initChecks(&$finalMessage, $fileFormLabel, $targetFile, $indexFile){
        
        $tempChk = checkBasicReqs($_FILES[$fileFormLabel]["tmp_name"][$indexFile]);
        if($tempChk !== 1)
        {
            //return tempChk;
            $finalMessage = ($tempChk);
            return 0;   
        }
        else
        {
            $tempChk = checkFileExists($targetFile);
            if($tempChk !== 1)
            {
                $finalMessage = ($tempChk);
                return 0;
            }
            else
            {
                return 1;
            }
        }
    }
    $res = "";
    for($i=0; $i<count($_FILES['file']['name']);$i++)
    {
        $res = $res . " " . theController($i);
    }
//SCRIPT TO BE MADE COMPATIBLE WITH BOTH FILE AND FILE[]
    echo $res; 
?>