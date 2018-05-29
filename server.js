// Requiring Node Modules
const express = require('express');
const bodyParser = require('body-parser');

// User validation input
const validateSearchInput = require('./validation/search');

// Fetch & parse rss feeds
const getRssFeeds = require('./functions/fetch-data');

// Search rss feeds
const searchRssFeeds = require('./functions/search-data');

// Initializing Express
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// RSS feeds to parse
const rssFeeds = [
  'http://www.npr.org/rss/rss.php?id=1001',
  'http://feeds.bbci.co.uk/news/rss.xml',
  'http://rss.cnn.com/rss/cnn_topstories.rss'
];

// @route   POST /search
// @desc    Fetches & searches rss feeds
// @access  Public
app.post('/search', async (req, res) => {
  console.log(req.body.searchQuery);
  const { searchQuery } = req.body;
  const { errors, valid } = validateSearchInput(searchQuery);

  if (!valid) {
    return res.status(400).json(errors);
  }

  // Remove leading and trailing white spaces
  // Remove extra white spaces in between words if any
  // Transform to lower case letters
  const search = searchQuery
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

  // Fetch and parse rss feeds
  const data = await getRssFeeds(rssFeeds);

  // Search rss feeds
  const searchResults = searchRssFeeds(data, search);

  // Respond the search results in json format
  return res.json(searchResults);
});

// You can manually set the port in .env file or default to port 5000
const port = process.env.PORT || 5000;

// API actively listening on its configured port
app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
