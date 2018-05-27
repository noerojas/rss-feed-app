function searchTitles(titles, searchQuery) {}

function searchDescriptions(descriptions, searchQuery) {}

function searchRssFeeds(data, search) {
  const [a, b, c] = data;
  console.log('search', a.title);
  console.log('search', b.title);
  console.log('search', c.title);

  return data;
}

module.exports = searchRssFeeds;
