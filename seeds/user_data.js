const userData = require("../seed-data/users");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").del();
    })
    .then(function () {
      return knex("users").insert(userData);
    });
};
