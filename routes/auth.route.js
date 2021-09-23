const router = require("express").Router();
const flash = require("connect-flash");
const { User } = require("../models/user.model");

router.get("/login", async (req, res, next) => {
  res.render("login");
});

router.post("/login", async (req, res, next) => {
  res.render("login");
});

router.get("/register", async (req, res, next) => {
  req.flash("error", "some Extra Error");
  req.flash("key", "Some value");

  // res.render("register");
  res.redirect("/auth/login");
});

router.post("/register", async (req, res, next) => {
  try {
    //checking unique user in database.
    const { email } = req.body;
    const doesExist = await User.findOne({ email });
    if (doesExist) {
      res.redirect("/auth/register");
      return;
    }
    // if user does not exit
    const user = new User(req.body);
    await user.save();

    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/logout", async (req, res, next) => {
  res.render("Logout routes");
});

module.exports = router;
