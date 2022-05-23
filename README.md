# news-application
A single page news application

# Steps to follow to run the application
1. Clone the application.
2. Use visual studio code.
3. Install **live-server** extension if not already done. Click [here](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to know about live-server.
4. Once live server is installed you will find "Go-Live" option at bottom right corner of Visual studio code.
5. Click on go live to see the application running on http://localhost:5500/ url.
6. The port(5500) might be different in your case and so go to `/scripts/const.js` and make sure to update **PORT** value if its different.
7. Use following links to access [HOME](http://localhost:5500) and [STORIES](http://localhost:5500?id=stories) page .
    
# Code structure
1. It has a simple bifurcation based on the file types.
2. It uses styles.scss for developement which is pre processed using SASS Compiler to render styles.css.
3. It uses ES6 to write js code
    - http-request.js - Has all the code to access external apis. Currently it just has GET method.
    - const.js - Has configurations to hold constants and can be extended to have values based on environment.
    - app.js - Has all the logic to fetch data and render templates.
4. It has dummy json files. As its runnig locally and json folder resides in the same environment, we are able to access them using same endpoint, but in real world we can have variables defining the different endpoints and use them.
5. Assets folder have all the images. It is assumed that api response will just give the image name.

Note - final.html is just a static html code of the given image.

# Workflow
This is a news applciation which fetches news based on the url user is accessing

- It is assumed that the url of the page will have CollectionType for e.g. home, stories. its like page identifier.
- Based on the page identifer, another api is called to fetch data for that page.
- Page is divided into 4 sections - Headlines, Sidebar( for Ads), Content area( Main and Sub).
- As of now headlines and sidebar are static in nature.
- The main content area shows data received from api response.
