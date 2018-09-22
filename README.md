[//]: # (Image References)

[image1]: ./images/logviewer.png "log viewer windows"

# Log viewer

This log viewer is written to view logs across machines within a cluster. It is originally written is javascript and electron and later rewrite it using React.

## Introduction

![alt text][image1]

This log viewer facilitates log viewing by load content from log files specified, highlight log entries in different colors. Besides, you can apply some filter like log level and keyword to filter useless log

If you want to reuse this setting in the future, you can export the current setting, and import it later for future use.

## Function

### Regex Settings

In this setting page, User provides the log file format, so the log viewer can extract attributes from each log entry.

* Regex for date: A regular expression to extract date time information from log entries e.g. (2014-07-02 20:52:39)
* DateTime format: Time format for parsing
* Log Regex format: A regular expression to extract log entry from log file

```
Default: ^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}[\s\S]+?((?=^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}|$)(?!\n|\s))

This regular expression extract log across lines and only stop when seeing a line start with a datetime format.
```

* Loglevel Regex format: A regular expression to extract log level inside a log entry.

To test the regular expression, you can go to https://regex101.com/ 

### Log files

10 log files can be added at most. A log file can be either a URL or a local file.

You can filter out a log file by removing the tick in the checkbox, you can also change the highlight color of a log.

### Log level

You can filter out unwanted log level at here.

### Ignore text

You can filter log entries by keywords at here. This list will remove any log entries having keywords in ignore text list. Ignore text takes precedent over Include text.

### Include text

You can filter log entries by keywords at here. This list will only include any log entries having keywords in ignore text list and remove other entries.

### Save/Load Setting

You can import and export configuration here by using clipboard or files.

## To build this project

This project has 3 folders. `logviewer-electron-original`, `logviewer-react` and `logviewer-react-electron`.

`logviewer-electron-original` is written in plain javascript and electron

`logviewer-react` is written in javascript and react

`logviewer-react-electron` is written in javascript, react and electron.

### Building from logviewer-electron-original

```
cd logviewer-electron-original
npm install
electron-packager . logviewer
```

### Building from logviewer-react-electron

Because compilation takes time and it is tedious to test program under electron, so `logviewer-react` is created for development purpose.

After the development process is finished, the code is copied from `logviewer-react` to `logviewer-react-electron` for final integration and packaging.

* Please aware that package.json, index.html and render_process.js are modified for electron uses. Don't just overwrite these files.

```
cd logviewer-electron-original
npm install
npm run bundle
npm run build_win32
```

## Pending issue

* If the log viewer adopts [React-virtualized](https://github.com/bvaughn/react-virtualized) module to improve the speed of displaying logs content, it is not possible for a user to copy log across pages.

## Credit

The project is originally developed by nathan1658. You can refer to the original project Github @ https://github.com/nathan1658/LogViewer-Electron