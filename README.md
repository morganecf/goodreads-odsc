# Introduction to D3

Example code and data for the "Introduction to Data Visualization Using D3.js" workshop at
the 2017 [Open Data Science Conference West](https://odsc.com/california).

**IMPORTANT UPDATE:** We will be adding code and data to this repository for the next couple of days. Please make sure your repository is up to date before the conference.

### Requirements
Python (or a tool that will allow you to serve files to your local host) and a modern browser. We'll be using Chrome. You can follow along without a server, but we strongly recommend you follow the instructions for serving files below.

### Setting up
1. Clone or download this repository.
2. `cd` inside the repository.
3. If on Mac/Linux, open up the terminal and run:
   * Using python 3: `python3 -m http.server <port>`
   * Using python 2+: `python -m SimpleHTTPServer <port>`
   * This allows D3 to load data, which is served by this simple python webserver hosting our directory. If we try to load data directly from our filesystem without a server, we'll get a cross origin request error -- D3 thinks it's loading data from a url different from our origin domain (the local filesystem).
4. If not on Mac/Linux, which come with a python installation, there are google-able alternatives. If you have node, you can run `npm install http-server -g` and launch `http-server`.
5. If setting up a server doesn't work, one alternative is to simply save a small subset of the data as a JavaScript object and load that file as you would any other `.js` file. This is already done for you. The data is stored in a variable in `data/sample-data.js`. Simply uncomment the line loading this file in `main.html` and you'll be able to access the data in an object named `data`. This isn't the recommended way of loading data but will work just fine for demo purposes.
5. Go to your localhost (ex: `0.0.0.0:8000`). You should see a directory listing. Open up `index.html`
   * If you're not using a localhost, directly open up `index.html` in your browser (ex: `file://user/Users/morgane/goodreads-odsc/index.html`)
7. Open up the dev console (`option+command+i` or right click and "inspect element" then click on the console).
8. Type `d3`, and you should be able to view the D3 library and all its properties.

### Loading data
If you're storing the data in a js file (`data.js`), you should be able to access it in the `data` object. It is already loaded for you in `main.html`. 

If you're serving data, you should be able to do:

```javascript
d3.json('data/data.json', data => {
  console.log('goodreads data:', data);
  // Do some stuff with it!
});
```

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
