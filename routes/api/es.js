const express = require("express");
const auth = require("../../middleware/auth");
const axios = require("axios");
const keys = require("../../config/config");
const path = require("path");

const router = express.Router();

// Loading Query Templates
const queryES = require("../../utilities/query.json");
const suggestES = require("../../utilities/suggest.json");

// Loading Search Conr
const { suggestorTermES, esQueryBuilder } = require("../../utilities/utils");

// @route GET /api/annexure/test
// @desc  Tests Annexure route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "es route test" }));

// @route GET /api/sd/suggest
// @desc  Suggestions from the es
// @access Public

router.get("/0", (req, res) => {});

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

// @route GET /api/sd/search
// @desc  Search from the elasticsearch
// @access Public
// Sample Query https://pastebin.com/jQ9qiV1e https://pastebin.com/9CdNxh91
// // https://stackoverflow.com/questions/25105147/elasticsearch-highlight-how-to-get-entire-text-of-the-field-in-java-client
router.get("/search", (req, res) => {
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

  // Solved no aggregations in the response
  // https://stackoverflow.com/questions/50159269/elasticsearch-aggregation-not-showing-count
  axios
    .post(
      "https://elastic:AoW7tfyGSx2Vhsd7JGFspnvN@283e4281e6fc4d77bb892cff3e77f8ec.us-west1.gcp.cloud.es.io:9243/klatest/_search",
      // path.join(
      //   keys.es_host_remote_new,
      //   keys.kla_test_index,
      //   keys.searchEndpoint
      // ),
      esQueryBuilder(queryParameters)
    )
    .then(({ data }) => {
      // console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(JSON.stringify(err, null, 2));
    });
});

module.exports = router;
