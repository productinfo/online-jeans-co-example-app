# Online Jeans Company

Sample application for visualising large data sets.

## Running the application

Requires node.js version 4.x or above, compatible with running ES6. 

- Clone this repo
- `npm install` to fetch all dependencies
- `node src/server/main.js` starts the server, running on port `3456` by default. Optionally use the parameter `-port nnnn`.
- Open [http://localhost:3456](http://localhost:3456)
- Pick a named report from the `Explore` menu to load a grid showing the relevant data.

Optionally recreate the data-source by running the included script `node scripts/create-sample-data.js > src/data/main.json`

Optionally reconfigure the available reports by modifying `src/data/report-types.json`

## About the report

- On selecting a report, the relevant data is fetched from the server using angular's $http wrapper for XMLHttpRequest.
- The server builds a summary for the selected report
- Summary data displayed in a grid, initially sorted by the primary key criteria with one row per secondary criteria along with the number of items sold with that combination.
- When sorting by any column the data will secondarily sort by count.

## Enhancements

- Using SlickGrid as the data grid, grouping or summary rows can be added to the grid to give supplementary data. 
- As the UI makes use of angular services to share data, testing of the UI can be achieved with a karma/jasmine integration and the ngMock module.
- Continuous integration of pull requests to run tests
   - see [git-js](https://github.com/steveukx/git-js) for an example of travis integrated with a grunt build for automated CI.
   - see [twitter-web-app](https://github.com/steveukx/twitter-web-app) for an example of an angular tested app using grunt / jasmine with istanbul code coverage. 
