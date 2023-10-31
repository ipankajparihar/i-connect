const queue = require("../config/kue");
const connectingMailer = require("../mailers/comments_mailer");

queue.process("emails", function (job, done) {
  console.log("emails worker is processing the job", job.data);

  connectingMailer.newComment(job.data);
  done();
});
