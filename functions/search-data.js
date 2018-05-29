// Return a boolean array with found partial title matches
const searchTitles = (data, searchQuery) =>
  data.map(item => item.title.toLowerCase().indexOf(searchQuery) > -1);

// Return a boolean array with found partial content matches
const searchContent = (data, searchQuery) =>
  data.map(item => item.content.toLowerCase().indexOf(searchQuery) > -1);

// Return a boolean array with with combined titles and content matches
const noDuplicates = (titles, content) =>
  titles.map((item, index) => item || content[index]);

// Returns an new array with found search results
const getSearchResults = (uniqueResults, rssItems) => {
  const searchResults = [];
  for (let i = 0; i < uniqueResults.length; i += 1) {
    if (uniqueResults[i]) {
      searchResults.push(rssItems[i]);
    }
  }
  return searchResults;
};

function searchRssFeeds(data, searchQuery) {
  const searchResults = {};
  const [npr, bbc, cnn] = data;

  // Perform a partial search for NPR RSS Feed
  // NPR Titles - returns boolean with found results
  const nprSearchTitles = searchTitles(npr.items, searchQuery);
  // NPR Content - returns boolean with found results
  const nprSearchContent = searchContent(npr.items, searchQuery);
  // Combine both titles and content so that there are no duplicate results
  const nprUniqueResults = noDuplicates(nprSearchTitles, nprSearchContent);
  // Get NPR final search results
  const nprSearchResults = getSearchResults(nprUniqueResults, npr.items);
  // Append the results to the searchResults Object
  searchResults.npr = nprSearchResults;

  // Perform a partial search for BBC RSS Feed
  // BBC Titles
  const bbcSearchTitles = searchTitles(bbc.items, searchQuery);
  // BBC Content
  const bbcSearchContent = searchContent(bbc.items, searchQuery);
  // Combine both titles and content so that there are no duplicate results
  const bbcUniqueResults = noDuplicates(bbcSearchTitles, bbcSearchContent);
  // Get BBC final search results
  const bbcSearchResults = getSearchResults(bbcUniqueResults, bbc.items);
  // Append the results to the searchResults Object
  searchResults.bbc = bbcSearchResults;

  // Perform a partial search for CNN RSS Feed
  // CNN Titles
  const cnnSearchTitles = searchTitles(cnn.items, searchQuery);
  // CNN Content
  const cnnSearchContent = searchContent(cnn.items, searchQuery);
  // Combine both titles and content so that there are no duplicate results
  const cnnUniqueResults = noDuplicates(cnnSearchTitles, cnnSearchContent);
  // Get CNN final search results
  const cnnSearchResults = getSearchResults(cnnUniqueResults, cnn.items);
  // Append the results to the searchResults Object
  searchResults.cnn = cnnSearchResults;

  return searchResults;
}

module.exports = searchRssFeeds;
