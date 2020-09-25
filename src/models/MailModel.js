class Mail {
  constructor(body, from, fromDate, fromFolder, id, subject, to, cc, bcc, key) {
    this.body = body;
    this.from = from;
    this.fromDate = fromDate;
    this.fromFolder = fromFolder;
    this.id = id;
    this.subject = subject;
    this.cc = cc;
    this.bcc = bcc;
    this.to = to;
    this.key = key;
  }
}

export default Mail;
