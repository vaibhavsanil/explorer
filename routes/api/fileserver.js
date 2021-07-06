const fs = require("fs");

const express = require("express");
const config = require("../../config/config");
const auth = require("../../middleware/auth");
const { reset } = require("nodemon");
const router = express.Router();

const { publicDir } = config;

router.get("/test", (req, res) => res.json({ msg: "File Server Test " }));

// @route GET /api/fs/section/:knwType/:cust/:bookId/:fromPage/:toPage
// @desc Get the sectional pdf's using request params
// @access Public

router.get("/section/:knwType/:cust/:bookId/:fromPage/:toPage", (req, res) => {
  const { knwType, cust, bookId, fromPage, toPage } = req.params;

  if (
    fs.existsSync(
      `${publicDir}/${knwType}/${cust}/${bookId}/sections/${fromPage}_${toPage}.pdf`
    )
  ) {
    let file = fs.createReadStream(
      `${publicDir}/${knwType}/${cust}/${bookId}/sections/${fromPage}_${toPage}.pdf`
    );
    var stat = fs.statSync(
      `${publicDir}/${knwType}/${cust}/${bookId}/sections/${fromPage}_${toPage}.pdf`
    );
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    // res.setHeader(
    //   "Content-Disposition",
    //   "inline",
    //   `filename=${fromPage}_${toPage}.pdf`
    // );
    file.pipe(res);

    //   res.send(req.params);
  } else {
    res.status(404).json({
      err: `no file`,
      msg: `The File Dont Exists in ${publicDir}/${knwType}/${cust}/${bookId}/sections/${fromPage}_${toPage}.pdf`,
    });
  }
});

// @route GET /api/fs//full/:knwType/:cust/:bookId
// @desc Get the full PDF's of Book Id
// @access Public

router.get("/full/:knwType/:cust/:bookId", (req, res) => {
  const { knwType, cust, bookId } = req.params;

  if (
    fs.existsSync(`${publicDir}/${knwType}/${cust}/${bookId}/${bookId}.pdf`)
  ) {
    let file = fs.createReadStream(
      `${publicDir}/${knwType}/${cust}/${bookId}/${bookId}.pdf`
    );
    var stat = fs.statSync(
      `${publicDir}/${knwType}/${cust}/${bookId}/${bookId}.pdf`
    );
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    // res.setHeader(
    //   "Content-Disposition",
    //   "inline",
    //   `filename=${fromPage}_${toPage}.pdf`
    // );
    file.pipe(res);

    //   res.send(req.params);
  } else {
    res.status(404).json({
      err: `The File Dont Exists`,
      msg: `${publicDir}/${knwType}/${cust}/${bookId}/${bookId}.pdf`,
    });
  }
});

// @route GET /annex/:knwType/:cust/:bookId/annexures/:fromPage/:toPage
// @desc Get the annexure items
// @access Public

router.get(
  "/annex/:knwType/:cust/:bookId/annex/:fromPage/:toPage",
  (req, res) => {
    const { knwType, cust, bookId, fromPage, toPage } = req.params;

    if (
      fs.existsSync(
        `${publicDir}/${knwType}/${cust}/${bookId}/annexures/${fromPage}_${toPage}.pdf`
      )
    ) {
      let file = fs.createReadStream(
        `${publicDir}/${knwType}/${cust}/${bookId}/annexures/${fromPage}_${toPage}.pdf`
      );
      var stat = fs.statSync(
        `${publicDir}/${knwType}/${cust}/${bookId}/annexures/${fromPage}_${toPage}.pdf`
      );
      res.setHeader("Content-Length", stat.size);
      res.setHeader("Content-Type", "application/pdf");
      // res.setHeader(
      //   "Content-Disposition",
      //   "inline",
      //   `filename=${fromPage}_${toPage}.pdf`
      // );
      file.pipe(res);

      //   res.send(req.params);
    } else {
      res.status(404).json({
        err: `The File Dont Exists`,
        msg: `${publicDir}/${knwType}/${cust}/${bookId}/annexures/${fromPage}_${toPage}.pdf`,
      });
    }
  }
);

module.exports = router;
