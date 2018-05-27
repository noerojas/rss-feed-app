// Requiring the RSS Parser module
const Parser = require('rss-parser');

// Initializing RSS Parser Constructor
const parser = new Parser();

async function getRssFeeds(rss) {
  try {
    const promises = rss.map(feed => parser.parseURL(feed));
    const rssFeeds = await Promise.all(promises);
    return rssFeeds;
  } catch (err) {
    return err;
  }
}

module.exports = getRssFeeds;
