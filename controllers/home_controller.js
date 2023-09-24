module.exports.home = function (req, res) {
  console.log("cookies", req.cookies);
  return res.render("home", {
    title: "Home",
  });
};
