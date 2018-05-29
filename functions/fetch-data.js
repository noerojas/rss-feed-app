// Requiring the RSS Parser module
const Parser = require('rss-parser');

// Initializing RSS Parser Constructor
const parser = new Parser();

// Async function fetching RSS feeds
async function getRssFeeds(rss) {
  try {
    // Fetch all rss feeds, returns an array of promises
    const promises = rss.map(feed => parser.parseURL(feed));
    // Await for all promises to return
    const rssFeeds = await Promise.all(promises);
    // Return all rss feeds
    return rssFeeds;
  } catch (err) {
    return err;
  }
}

module.exports = getRssFeeds;
