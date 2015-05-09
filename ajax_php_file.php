<?php

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
            $checkSize = @getimagesize($fileObject);
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

    

    function theController($indexFile){

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
    //         case 2:return "Not an Image";
    //         case 3:return "File Exists";
    //         case 5 - fatal error
    //         case 1- success
    
?>