// © 2022 Neeraj Krishna.
const fs = require('fs')
const { writeFile } = require('fs/promises')
const PastebinAPI = require("pastebin-js"),
  pastebin = new PastebinAPI("LHeif_28w_aGHrVY1NAY1JVLfJW1h9PX");
module.exports = {
  async MakeSession(session_id, authFile) {
    return new Promise((resolve, reject) => {
      code = session_id.replace(/_BOSCO_/g, "");
      code = Buffer.from(code, "base64").toString("utf-8");
      pastebin
        .getPaste(code)
        .then(async function(data) {
          if (!fs.existsSync(authFile)) {
            await writeFile(authFile, data);
            resolve(true)
          }
        })
        .fail(function(err) {
          reject(err)
          console.log(err);
        });
    })


  },
};
