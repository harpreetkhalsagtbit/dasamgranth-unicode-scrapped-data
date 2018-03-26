const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
var base_uri = "https://www.searchgurbani.com/public/dasam-granth/page/";
var options = {
  uri: `https://www.searchgurbani.com/public/dasam-granth/page/`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

  for(let i=1;i<=2820;i++) {
    setTimeout(function() {
        options.uri = base_uri + i;
        rp(options)
        .then(($) => {
            fs.writeFile('./output/dasam_granth_' + i + ".txt", $(".lang_1").text(), (err) => {
                if (err) throw err;
                console.log('The file has been saved! ', i);
              });
        })
        .catch((err) => {
        console.log(i, "err....");
        });
    }, i*100)
  }