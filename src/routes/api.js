const express = require("express");
const router = express.Router();
// const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:3000",
// };
// router.use(cors(corsOptions));
router.use("/v1", require("./api/v1"));
module.exports = router;
