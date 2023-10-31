const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require("./environment");

let transpoter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data, relativePath) => {
  let mailHtml;
  ejs.renderFile(
    path.join(__dirname, "../views/mailer", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template");
        return;
      }
      mailHtml = template;
    }
  );
  return mailHtml;
};

module.exports = {
  transpoter: transpoter,
  renderTemplate: renderTemplate,
};
