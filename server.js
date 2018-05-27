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
  const { search } = req.body;
  const { errors, valid } = validateSearchInput(search);

  if (!valid) {
    return res.status(400).json(errors);
  }

  const query = search
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

  // Fetch and parse rss feeds
  const data = await getRssFeeds(rssFeeds);

  // Search rss feeds
  const searchResults = searchRssFeeds(data, query);

  // console.log('Data:', data);
  return res.json(data);
});

// async () => {
//   // Object
//   const feed = await parser.parseURL('https://www.npr.org/rss/rss.php?id=1001');
//   // console.log(feed);

//   const titles = [];
//   const descriptions = [];

//   // feed.items.forEach(item => {
//   //   console.log('FEED:______________________');
//   //   console.log(`Title: ${item.title}`);
//   //   console.log(`Link: ${item.link}`);
//   //   console.log(`Content: ${item.content}`);

//   //   titles
//   //   console.log('\n');
//   //   console.log('\n');
//   // });

//   for (let i = 0; i < feed.items.length; i += 1) {
//     titles[i] = feed.items[i].title;
//   }
//   console.log(titles);

//   const search = " you're  ";
//   const query = search
//     .trim()
//     .replace(/\s+/g, ' ')
//     .toLowerCase();

//   console.log(query);

//   const searchResults = titles.map(index => index.toLowerCase().indexOf(query) > -1);
//   console.log(searchResults);
// });

// You can manually set the port in .env file or default to port 5000
const port = process.env.PORT || 5000;

// API actively listening on its configured port
app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
