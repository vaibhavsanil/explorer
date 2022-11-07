const fs = require("fs");

const express = require("express");
const config = require("../../config/config");
const utils = require("../../utilities/utils");
const auth = require("../../middleware/auth");
const { CUSTOMER } = require("../../config/config");
const path = require("path");

const router = express.Router();

const { getPDFFiles, getPDFFilesFull } = utils;
const { publicDirLocal, publicDirServer } = config;

const publicDir =
  process.env.NODE_ENV === "production" ? publicDirServer : publicDirLocal;
router.get("/test", (req, res) => res.json({ msg: "File Server Test " }));

// @route GET /api/fs/section/:knwType/:cust/:bookId/:fromPage/:toPage
// @desc Get the sectional pdf's using request params
// @access Public

router.get("/section/:knwType/:cust/:bookId/:fromPage/:toPage", (req, res) => {
  const { knwType, cust, bookId, fromPage, toPage } = req.params;

  let sectionURL = path.join(
    "api",
    "fs",
    "section",
    knwType,
    cust,
    bookId,
    fromPage,
    toPage
  );
  let fileserver = config.file_server_url;

  let fileserverPath = path.join(fileserver, sectionURL);

  getPDFFiles(fileserverPath, bookId, fromPage, toPage)
    .then(() => {
      if (
        fs.existsSync(
          path.join(
            config["tempDirCache"],
            `${bookId}_${fromPage}_${toPage}.pdf`
          )
        )
      ) {
        let file = fs.createReadStream(
          path.join(
            config["tempDirCache"],
            `${bookId}_${fromPage}_${toPage}.pdf`
          )
        );
        var stat = fs.statSync(
          path.join(
            config["tempDirCache"],
            `${bookId}_${fromPage}_${toPage}.pdf`
          )
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

        file.on("end", () => {
          fs.unlinkSync(
            path.join(
              config["tempDirCache"],
              `${bookId}_${fromPage}_${toPage}.pdf`
            )
          );
        });
      } else {
        res.status(404).json({
          err: `no file`,
          msg: `The File Dont Exists in ${path.join(
            config["tempDirCache"],
            `${bookId}_${fromPage}_${toPage}.pdf`
          )}`,
        });
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

// @route GET /api/fs//full/:knwType/:cust/:bookId
// @desc Get the full PDF's of Book Id
// @access Public

router.get("/full/:knwType/:cust/:bookId", (req, res) => {
  const { knwType, cust, bookId } = req.params;

  let sectionURL = path.join("api", "fs", "full", knwType, cust, bookId);
  let fileserver = config.file_server_url;

  let fileserverPath = path.join(fileserver, sectionURL);

  getPDFFilesFull(fileserverPath, bookId)
    .then(() => {
      let filePath = path.join(config["tempDirCache"], `${bookId}_full.pdf`);
      if (fs.existsSync(filePath)) {
        let file = fs.createReadStream(filePath);
        var stat = fs.statSync(filePath);
        res.setHeader("Content-Length", stat.size);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "attachment",
          `filename=${bookId}.pdf`
        );
        file.pipe(res);

        file.on("end", () => {
          fs.unlinkSync(filePath);
        });
        //   res.send(req.params);
      } else {
        res.status(404).json({
          err: `no file`,
          msg: filePath,
        });
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

// @route GET /annex/:knwType/:cust/:bookId/annexures/:fromPage/:toPage
// @desc Get the annexure items
// @access Public

router.get("/annex/:knwType/:cust/:bookId/:fromPage/:toPage", (req, res) => {
  const { knwType, cust, bookId, fromPage, toPage } = req.params;

  let sectionURL = path.join(
    "api",
    "fs",
    "annex",
    knwType,
    cust,
    bookId,
    fromPage,
    toPage
  );
  let fileserver = config.file_server_url;

  let fileserverPath = path.join(fileserver, sectionURL);

  getPDFFiles(fileserverPath, bookId, fromPage, toPage)
    .then(() => {
      if (
        fs.existsSync(
          path.join(
            config["tempDirCache"],
            `${bookId}_${fromPage}_${toPage}.pdf`
          )
        )
      ) {
        let file = fs.createReadStream(
          path.join(
            config["tempDirCache"],
            `${bookId}_${fromPage}_${toPage}.pdf`
          )
        );
        var stat = fs.statSync(
          path.join(
            config["tempDirCache"],
            `${bookId}_${fromPage}_${toPage}.pdf`
          )
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

        file.on("end", () => {
          fs.unlinkSync(
            path.join(
              config["tempDirCache"],
              `${bookId}_${fromPage}_${toPage}.pdf`
            )
          );
        });
      } else {
        res.status(404).json({
          err: `no file`,
          msg: `The File Dont Exists in ${path.join(
            config["tempDirCache"],
            `${bookId}_${fromPage}_${toPage}.pdf`
          )}`,
        });
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });

  // if (
  //   fs.existsSync(
  //     `${publicDir}/${knwType}/${cust}/${bookId}/annexures/${fromPage}_${toPage}.pdf`
  //   )
  // ) {
  //   let file = fs.createReadStream(
  //     `${publicDir}/${knwType}/${cust}/${bookId}/annexures/${fromPage}_${toPage}.pdf`
  //   );
  //   var stat = fs.statSync(
  //     `${publicDir}/${knwType}/${cust}/${bookId}/annexures/${fromPage}_${toPage}.pdf`
  //   );
  //   res.setHeader("Content-Length", stat.size);
  //   res.setHeader("Content-Type", "application/pdf");
  //   // res.setHeader(
  //   //   "Content-Disposition",
  //   //   "inline",
  //   //   `filename=${fromPage}_${toPage}.pdf`
  //   // );
  //   file.pipe(res);

  //   //   res.send(req.params);
  // } else {
  //   res.status(404).json({
  //     err: `no file`,
  //     msg: `${publicDir}/${knwType}/${cust}/${bookId}/annexures/${fromPage}_${toPage}.pdf`,
  //   });
  // }
});

module.exports = router;
