const mountainData = require("../seed-data/mountains");

exports.seed = function (knex) {
  return knex("mountains")
    .del()
    .then(() => {
      return knex("mountains").del();
    })
    .then(function () {
      return knex("mountains").insert(mountainData);
    });
};
