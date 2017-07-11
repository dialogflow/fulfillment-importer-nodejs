/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const Alexa = require('alexa-sdk');
const google = require('googleapis');

// Constants to call the YouTube API
// Go to https://developers.google.com/youtube/v3/getting-started
// for instructions on how to get an API key
const YOUTUBE_API_KEY = 'PUT_API_KEY_HERE';
const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY
});

// Static Responses
const HELP_MESSAGE = 'Welcome to Popular Videos, I can tell you the titles of the most popular videos on YouTube right now.';
const STOP_MESSAGE = 'Goodbye!';
const NO_CONNECTION_MESSAGE = 'I can\'t connect to YouTube right now, please try again later.';

// Setup request handler
exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

// Define intent handlers to fulfill Alexa requests
const handlers = {
  // Intent for a request to launch the request
  'LaunchRequest': function () {
    this.emit('GetPopularVideosIntent');
  },
  // Intent for listing the 5 most popular videos on YouTube
  'GetPopularVideosIntent': function () {
    youtube.search.list({
      part: 'snippet',
      maxResults: 5,
      chart: 'mostPopular',
      regionCode: 'US'
    }, function (err, data) {
      if (err) {
        console.error('Error: ' + err);
      }
      if (data) {
        // Get a string of all video titles
        var titles = data['items'].reduce(function(prevVal, elem, index) {
          title =  prevVal + elem['snippet']['title']
          if (index === 3 ){ title += ', and ';} 
          else if ( index === 4) { title += '.'}
          else { title += ', '; }
          return title
        }, '');

        // Log the output and emit it
        console.log('Response to user:\n');
        console.log(output);
        console.log('\n');
        this.emit(':tell', output);
      }
    });
  },
  // Amazon's built-in intent for help
  'AMAZON.HelpIntent': function () {
    const speechOutput = HELP_MESSAGE;
    this.emit(':ask', speechOutput);
  },
  // Amazon's built-in intent for canceling
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', STOP_MESSAGE);
  },
  // Amazon's built-in intent for stopping
  'AMAZON.StopIntent': function () {
    this.emit(':tell', STOP_MESSAGE);
  }
};
