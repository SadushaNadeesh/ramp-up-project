const http = require('http');
const { postgraphile } = require('postgraphile');
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(
  postgraphile(
    "postgres://postgres:1234@localhost:5432/v_data", "public", {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    appendPlugins: [PostGraphileConnectionFilterPlugin],
    graphileBuildOptions: {
      connectionFilterRelations: true,
    },
  })
);

app.listen(process.env.PORT || 5000);

// http.createServer(
//   postgraphile("postgres://postgres:1234@localhost:5432/v_data", "public", {
//     watchPg: true,
//     graphiql: true,
//     enhanceGraphiql: true,
//     appendPlugins: [PostGraphileConnectionFilterPlugin],
//     graphileBuildOptions: {
//       connectionFilterRelations: true,
//     },
//   })
// )
//   .listen("5000");
