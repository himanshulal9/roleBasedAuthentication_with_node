const router = require("express").Router();

router.get("/login", async (req, res, next) => {
  res.render("login");
});

router.get("/register", async (req, res, next) => {
  res.render("register");
});

router.post("/login", async (req, res, next) => {
  res.render("login");
});

router.post("/register", async (req, res, next) => {
  res.render("register");
});

router.get("/logout", async (req, res, next) => {
  res.render("Logout routes");
});

module.exports = router;
