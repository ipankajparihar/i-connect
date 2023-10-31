const nodeMailer = require("../config/nodemailer");

//another way of exporting
exports.newComment = (comment) => {
  console.log("inside the new comment mailer");
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comments.ejs"
  );
  nodeMailer.transpoter.sendMail(
    {
      from: "pankajsinghparihar211@gmail.com",
      to: comment.user.email,
      subject: "new comment publiched",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("err in sending mail", err);
        return;
      }

      return;
    }
  );
};
