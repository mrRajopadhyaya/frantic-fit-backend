import Bookshelf from "../../Bookshelf";
import knexConfig from "../../knex/knex";

const User = Bookshelf.Model.extend({
  tableName: "users",
  hasTimestamps: true,
  verifyPassword: (password, databasePassword) => {
    return password === databasePassword;
  },
  byEmail: email => {
    return this.forge()
      .query({ where: { email} })
      .fetch();
  },
  byId: id => {
    return new Promise((resolve, reject) => {
      try {
        resolve(knexConfig("users").where("id", "=", id));
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
  updateById: (id, userData) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          knexConfig("users")
            .where("id", "=", id)
            .update(userData)
            .returning("*")
        );
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }
});

export default User;
