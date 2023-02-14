const sql = require("./index.js")

const Movies = function(tutorial) {
  this.title = tutorial.title
  this.description = tutorial.description
  this.published = tutorial.published
}

Movies.create = (newMovies, result) => {
  sql.query("INSERT INTO movies SET ?", newMovies, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created movies: ", { id: res.insertId, ...newMovies });
    result(null, { id: res.insertId, ...newMovies });
  });
};

Movies.findById = (id, result) => {
  sql.query(`SELECT * FROM movies WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found movies: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM movies";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movies: ", res);
    result(null, res);
  });
};

Movies.getAllPublished = result => {
  sql.query("SELECT * FROM movies WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movies: ", res);
    result(null, res);
  });
};

Movies.updateById = (id, movies, result) => {
  sql.query(
    "UPDATE movies SET title = ?, description = ?, published = ? WHERE id = ?",
    [movies.title, movies.description, movies.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...movies });
      result(null, { id: id, ...movies });0
    }
  );
};

Movies.remove = (id, result) => {
  sql.query("DELETE FROM movies WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted movies with id: ", id);
    result(null, res);
  });
};

Movies.removeAll = result => {
  sql.query("DELETE FROM movies", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} movies`);
    result(null, res);
  });
};

module.exports = Movies;