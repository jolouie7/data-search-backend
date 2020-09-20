const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const posts = [
  {id: 1, title: "json"},
  {id: 2, title: "joseph"},
  {id: 3, title: "banana"},
  {id: 4, title: "Post 1"},
  {id: 5, title: "Post 2"},
  {id: 6, title: "Post 3"},
  {id: 7, title: "Post 4"},
  {id: 8, title: "Post 5"},
  {id: 9, title: "Post 6"},
  {id: 10, title: "Post 7"},
  {id: 11, title: "Post 8"},
  {id: 12, title: "Post 9"},
  {id: 13, title: "Post10"},
  {id: 14, title: "Post11"},
  {id: 15, title: "mypost"},
  {id: 16, title: "post"},
  {id: 17, title: "Posts"},
  {id: 18, title: "nice post"},
  {id: 19, title: "Amazing post read here"},
  {id: 20, title: "Co"},
]

// apply middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//custom middleware
const paginatedResults = (model) => {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    //check if we are on the last page
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    //check if we are on the first page
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = model.slice(startIndex, endIndex);
    res.paginatedResults = results;
    next()
  }
}

// would need a route that returns all posts when hit, so users can filter through the whole list of posts
app.get("/posts", paginatedResults(posts), (req, res) => {
  res.json(res.paginatedResults);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});