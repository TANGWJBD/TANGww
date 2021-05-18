/*
 * @author: TANG
 * @create: 2021-04-27 08:54 AM
 * @license: MIT
 * @lastAuthor: TANG
 * @lastEditTime: 2021-04-28 16:16 PM
 * @desc:
 */
"use strict";
// const Routers = require('./routers/router');

const Hapi = require("@hapi/hapi");

const server = Hapi.server({
  port: 3000,
  host: "localhost",
  // debug: false,
  routes: {
    cors: {
      origin: ["*"],
    },
  },
});

server.route({
  method: "POST",
  path: "/getAllDta",
  handler: async(req, res) => {
    let user = req.payload.username;
    let pass = req.payload.password;
    const selec = 'select * from `userdb`.`user` where `username` = '+ user +';';
    const center =await req.app.db.query(selec);
    console.log(center);
    if(center == ''){
      const sql = 'INSERT INTO `userdb`.`user` (`username`,`password`) VALUES ('+ user +','+ pass +')';
      const data = req.app.db.query(sql);
      return true;
    }
    else{
      return false;
    }
    
  },
});

server.route({
    method: "POST",
    path: "/getAllData",
    handler: (req, res) => {
      const sql = "select * from `userdb`.`user`;";
      const data = req.app.db.query(sql);
      return data;
    },
  });

const init = async () => {
  await server.register({
    plugin: require("hapi-plugin-mysql"),
    options: {
      host: "localhost",
      user: "root",
      password: "r",
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
init();
