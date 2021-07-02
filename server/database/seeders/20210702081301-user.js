'use strict';

module.exports = {
  up: queryInterface => {

    return queryInterface.bulkInsert('users', [{
      username: 'admin',
      password: 'f506934d306cacff908285a24937abd0',
      name: 'admin',
    }], {});
  },

};
