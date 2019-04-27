# localStorage_Cache
a local Storage caching solution to speed up downloading time of scripts and styleSheets

Steps to use:-
  1. Copy the php code from the php file and place on the top of your HTML page.
  2. Inside the php code, replace the below files with the various js and css files needed in your project...
        $require = array(
						"http://192.168.38.31/lsvb/builder-section-1.css"	,
						"http://192.168.38.31/lsvb/builder-section-2.css"	,
						"http://192.168.38.31/lsvb/jquery-1.9.1.js"
					);
	3. For all the files that you are including from other domains, you need to get CORS headers approval since this solution requires the use of AJAX for creating a copy of your stylesheets/ scripts.
	4. Include the js file at the bottom
	    NOTE - There would be no impact on the first time download time, since by using cookies, the first time, your files are embedded in the HTML itself just like usual pages.
	            These files are downloaded through AJAX on window load and put in the Local Storage and also, on successful inclusion the respective Cookie Variables are set, so that the next time, all the successfully downloaded files are directly deployed from the Local Storage.
              So, no overhead at all anytime, anywhere and on the upside we get a very fast caching solution through Local Storage.	            
