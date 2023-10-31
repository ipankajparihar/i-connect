module.exports.index = function (req, res) {
  return res.json({
    message: "list of post",
    posts: [],
  });
};
