const express = require("express");
const auth = require("../../middleware/auth");
const axios = require("axios");
const keys = require("../../config/config");
const path = require("path");

const router = express.Router();

// app.disable('x-powered-by');

// Loading ES Query Templates
const queryES = require("../../utilities/query.json");
const queryExplorerStats = require("../../utilities/query_stats.json");
const suggestES = require("../../utilities/suggest.json");

// Loading Search Conr
const { suggestorTermES, esQueryBuilder } = require("../../utilities/utils");
// const { escape } = require('querystring');
const {
  CUSTOMER,
  es_user,
  es_pass,
  es_host_remote,
  es_local,
  kla_test_index,
  klc_test_index,
  kla_prod_index,
  klc_prod_index,
} = require("../../config/config");

// @route GET /api/annexure/test
// @desc  Tests Annexure route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "es route test" }));

// @route GET /api/sd/suggest
// @desc  Suggestions from the es
// @access Public

router.get("/0", (req, res) => {
  let suggestParameters = req.query;

  const { q } = suggestParameters;

  // console.log(JSON.stringify(suggestorTermES(q), null, 2));

  axios
    .post(
      // `https://${es_user}:${es_pass}@${es_host_remote_new}:${es_port}/${kla_test_index}/_search`,
      es_host_remote_full,
      suggestorTermES(q)
    )
    .then(({ data }) => {
      console.log({ data });
      res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// @route GET /api/sd/search
// @desc  Search from the elasticsearch
// @access Public
// Sample Query https://pastebin.com/jQ9qiV1e https://pastebin.com/9CdNxh91
// // https://stackoverflow.com/questions/25105147/elasticsearch-highlight-how-to-get-entire-text-of-the-field-in-java-client
router.get("/sh", (req, res) => {
  // https://spin.atomicobject.com/2015/10/03/remote-pfs-node-js-express/
  // https://stackoverflow.com/questions/316781/how-to-build-query-string-with-javascript
  var queryParameters = req.query;
  const l = {
    ln: "kn",
    srt: "",
    qt: "rec",
    qp: "world bank",
    dtf: "part1,part2",
    anf: "13[2005-2008]",
    snf: "13[2007]",
    dsubfEng: "zero hour,rule 69",
    dsubfKan: "",
    dpfEng: "",
    dpfKan: "",
    dbf: "24",
    ytf: "2000,2001",
    sectionDateFrm: "2000-01-01",
    sectionDateTo: "1999-01-01",
    issfEng: "cauvery,river",
    issfKan: "",
    tagfKan: "krishna,water",
    tagfEng: "",
  };
  // console.log(
  //   `The Query is \n ${JSON.stringify(
  //     esQueryBuilder(queryParameters),
  //     null,
  //     2
  //   )}`
  // );

  // console.log(`The Query is \n ${JSON.stringify(queryParameters, null, 2)}`);
  // Solved no aggregations in the response
  // https://stackoverflow.com/questions/50159269/elasticsearch-aggregation-not-showing-count

  console.log(
    `The Query Builder is \n ${JSON.stringify(
      esQueryBuilder(queryParameters),
      null,
      2
    )}`
  );

  const elasticUrlPath = () => {
    // "sdc-build-pm2": "NODE_ENV=production pm2 start server.js"
    if (process.env.NODE_ENV === "production") {
      console.log(
        `[Elasticsearch] Calling URL for Elastic Search ${es_local}/${
          CUSTOMER === "KLA" ? kla_prod_index : klc_prod_index
        }/_search`
      );
      return `${es_local}/${
        CUSTOMER === "KLA" ? kla_prod_index : klc_prod_index
      }/_search`;
    } else {
      console.log(
        `[Elasticsearch][DEV] Calling URL for Elastic Search https://${es_user}:${es_pass}@${es_host_remote}/${
          CUSTOMER === "KLA" ? kla_test_index : klc_test_index
        }/_search`
      );
      return `https://${es_user}:${es_pass}@${es_host_remote}/${
        CUSTOMER === "KLA" ? kla_test_index : klc_test_index
      }/_search`;
    }
  };

  axios
    .post(
      elasticUrlPath(),

      // path.join(
      //   keys.es_host_remote_new,
      //   keys.kla_test_index,
      //   keys.searchEndpoint
      // ),
      esQueryBuilder(queryParameters)
    )
    .then(({ data }) => {
      // console.log(data);
      let responseSearchResults = {};

      const { took, hits, aggregations } = data;

      responseSearchResults.timeTaken = took;
      responseSearchResults.numberResults = hits.total.value;
      responseSearchResults.debateResults = hits.hits;
      responseSearchResults.analysis = aggregations;

      // console.log(
      //   `[DEBUG] From server.js the value of response header is \n ${JSON.stringify(
      //     responseSearchResults
      //   )}`
      // );
      res.status(200).json(responseSearchResults);
    })
    .catch((err) => {
      res.status(400).json(err);
      // console.log(JSON.stringify(err, null, 2));
    });
});

// @route GET /api/sd/df
// @desc  Search the default values of aggregations to display it on the explorer page
// @access Public
/// https://stackoverflow.com/questions/22927098/show-all-elasticsearch-aggregation-results-buckets-and-not-just-10

router.get("/df", (req, res) => {
  var queryParameters = req.query;

  const elasticUrlPath = () => {
    // "sdc-build-pm2": "NODE_ENV=production pm2 start server.js"
    if (process.env.NODE_ENV === "production") {
      // console.log(
      //   `[Elasticsearch] Calling URL for Elastic Search ${es_local}/${
      //     CUSTOMER === 'KLA' ? kla_prod_index : klc_prod_index
      //   }/_search`
      // );
      return `${es_local}/${
        CUSTOMER === "KLA" ? kla_prod_index : klc_prod_index
      }/_search`;
    } else {
      // console.log(
      //   `[Elasticsearch][DEV] Calling URL for Elastic Search https://${es_user}:${es_pass}@${es_host_remote}/${
      //     CUSTOMER === 'KLA' ? kla_test_index : klc_test_index
      //   }/_search`
      // );
      return `https://${es_user}:${es_pass}@${es_host_remote}/${
        CUSTOMER === "KLA" ? kla_test_index : klc_test_index
      }/_search`;
    }
  };

  axios
    .post(
      elasticUrlPath(),

      queryExplorerStats
    )
    .then(({ data }) => {
      // console.log(data);
      let responseSearchResults = {};

      const { took, hits, aggregations } = data;

      responseSearchResults.timeTaken = took;
      responseSearchResults.numberResults = hits.total.value;
      // responseSearchResults.debateResults = hits.hits;
      responseSearchResults.analysis = aggregations;

      // console.log(
      //   `[DEBUG] From server.js the value of response header is \n ${JSON.stringify(
      //     responseSearchResults
      //   )}`
      // );
      res.status(200).json(responseSearchResults);
    })
    .catch((err) => {
      res.status(400).json(err);
      // console.log(JSON.stringify(err, null, 2));
    });
});

// @route GET /api/sd/search
// @desc  Search from the elasticsearch
// @access Public

router.get("/searchDemo", (req, res) => {
  // https://stackoverflow.com/questions/45291983/sending-requests-to-elasticsearch-with-axios
  var queryParameters = req.query;
  // res.json(queryParameters);

  axios
    .get(keys.es_host_remote, {
      source_content_type: "application/json",
    })
    .then(function ({ data }) {
      res.status(200).json(data);
      console.log(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
      console.error(err);
    });
});

module.exports = router;
