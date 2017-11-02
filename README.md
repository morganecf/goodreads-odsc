# Introduction to D3

Example code and data for the "Introduction to Data Visualization Using D3.js" workshop at
the 2017 [Open Data Science Conference West](https://odsc.com/california).

**IMPORTANT UPDATE:** We will be adding code and data to this repository for the next couple of days. Please make sure your repository is up to date before the conference.

### Requirements
Python (or a tool that will allow you to run a local web server) and a modern browser. We'll be using Chrome.
You can follow along without a server, but we strongly recommend you follow the instructions for serving files
below.

The examples here use some JavaScript language features which may not be supported in all browsers. We recommend
a recent version of either Chrome, Firefox, or Safari.

### Setting up
1. Clone or download this repository.
2. `cd` inside the repository.
3. Start a web server.
   * If on macOS or Linux, open up the terminal and run either `python3 -m http.server` or
     `python -m SimpleHTTPServer`.
   * If on Windows:
     * If you have Python installed, follow the same instructions as for macOS/Linux.
     * If you do not have Python installed, run the `windows_powershell_server.ps1` script from the
       `scripts` directory.
     * There are also other alternatives. For example, if you have Node.js installed, you can run
       `npm install -g http-server` and then launch `http-server`.
   * These commands start a simple web server for hosting static files from the current directory.
     Using a web server allows pages to load data from separate files (as long as they are within the
     current directory). Without a web server (if we right clicked on an HTML file and opened it in a
     browser), requests to load data files would fail with a cross origin request error since browsers
     will not allow pages to load files directory from the local file system.
4. Open http://localhost:8000 in a browser.
5. Open up the developer console (`option+command+i` on macOS or right click and "Inspect Element" then
   click on the console tab).
6. Type `d3` and press enter and you should be able to view the D3 library and all its properties.
7. While working, it is helpful to turn off the browser's caching. This ensures that any changes you
   make will be loaded by the browser on the next refresh.
   http://nicholasbering.ca/tools/2016/10/09/devtools-disable-caching/ explains how to disable
   caching in Chrome, Firefox, and Safari.
8. If setting up a server doesn't work, one alternative is to save the data in a JavaScript file and
   load that file as you would any other script file. For example, you could rename `data/books.json`
   to `data/books.js` and modify it to store the data object in a global variable. So `books.js` would
   look like:
   ```javascript
   window.data = {
     "123456": {"authors":"..."},
     ...
   }
   ```
   Then you could replace this code:
   ```html
   <script>
     d3.json('../data/books.json', data => {
       console.log(data);
       ...
     }
   </script>
   ```
   with this code:
   ```html
   <script src="../data/books.js"></script>
   <script>
     console.log(window.data);
     ...
   </script>
   ```
   This isn't the recommended way of loading data but it will work just fine for workshop/demo purposes.

## Reference

* [D3 API](https://github.com/d3/d3/blob/master/API.md)
* [More D3 resources](https://github.com/d3/d3#resources)

## License

Example code and data is licensed under the
[Creative Commons Attribution Share Alike 4.0 license](https://choosealicense.com/licenses/cc-by-sa-4.0/)

This repository includes the following third party libraries:
* [D3.js](https://d3js.org/) is copyright [Mike Bostock](https://github.com/mbostock) and licensed under the
  [BSD 3-clause license](https://github.com/d3/d3/blob/master/LICENSE).
* [d3-tip](http://labratrevenge.com/d3-tip/) is copyright [Justin Palmer](https://github.com/Caged) and licensed under the
  [MIT license](https://github.com/Caged/d3-tip/blob/master/LICENSE).
* [Lodash](https://lodash.com/) is copyright [JS Foundation](https://js.foundation) and licensed under the
  [MIT license](https://github.com/lodash/lodash/blob/master/LICENSE).
