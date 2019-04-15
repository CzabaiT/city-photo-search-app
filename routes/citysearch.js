const express = require('express');
const router = express.Router();
const cities = require('../node_modules/cities.json/cities');

// Logic for city searcher endpoint
router.get('/citysearch', function (req, res, next) {
  const doCitySearch = function (cities, searchTerm) {
    const searchResultLimit = parseInt(process.env.SEARCH_RESULT_LIMIT, 10)
      || 10,
      searchRegex = new RegExp(searchTerm, "i"),
      searchResults = [];
    let resultCounter = 0;

    for (let i = 0; i < cities.length; i += 1) {
      if (searchRegex.test(cities[i].name)) {
        searchResults.push(cities[i]);
        if (++resultCounter === searchResultLimit) {
          break;
        }
      }
    }

    return searchResults;
  };

  if (!req.query.searchTerm) {
    next(new Error('missing searchTerm'));
  } else {
    res.json(doCitySearch(cities, req.query.searchTerm));
  }
});

module.exports = router;
