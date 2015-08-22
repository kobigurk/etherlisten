## EtherListen - Ethereum Transaction Visualizer ##

Proudly based on BitListen (http://bitlisten.com/, https://github.com/MaxLaumeister/bitlisten).

Realtime Ethereum transaction visualizer written in HTML/Javascript. See and hear new transactions and blocks as they propagate through the Ethereum Network.

### Building ###

The project is built and ready-to-go in the dist folder. If you change any of the javascript, you will need to re-build the `etherlisten.min.js` file using Grunt. If you haven't used Grunt before, here is a short tutorial:

1. [Install Node.js](https://nodejs.org/download/).

2. Install grunt-cli using `sudo npm install -g grunt-cli`.

2. Cd into the project directory and run `npm install` to install the proper Grunt version and dependencies for this project.

3. Run `grunt` to build EtherListen. Alternatively, run `grunt watch` to build EtherListen, host it at http://localhost:8000, and watch for and rebuild changes in the source files.

The compiled/minified script will be output to `etherlisten.min.js`.

### APIs and Libraries ###

EtherListen uses these libraries:

* [Howler.js](http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library) by James Simpson
* [Reconnecting-Websocket](https://github.com/joewalnes/reconnecting-websocket) by Joe Walnes

EtherListen uses these APIs:

* [etherlisten-websocket](https://github.com/kobigurk/etherlisten-websocket/) WebSocket API (For Transactions)

### License ###

Copyright (c) 2015 Kobi Gurkan

Copyright (c) 2014 Maximillian Laumeister

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
