var mysql = require('mysql');
var client = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'mp3_scrapper'
});
client.connect();

function db_insert(val,val1,val2) {
  var sql='insert into files_info (title,url,size) values ("' + val + '","' + val1 + '","' + val2 + '")';
      client.query(sql, function(err, res) {
      //client.query(sql);
      });
 }
 


var request = require("request");
var cheerio = require("cheerio");

client.query("SELECT * FROM temp_urls",
    function(err, results, fields) {
      if (err) throw err;
      for (var index in results) {
        console.log(results[index].uri);
        // fetching Songs
         var request_uri=results[index].uri;
          request({
            uri: request_uri,
          }, function(error, response, body) {
            var $ = cheerio.load(body);
            var i=0;
            $("#song_html").each(function(){
              if($(this)){
                var link = $(this);
                var mp3 = $(this).find("a").attr("href");
                var title = $(this).find("b").text();
                if (mp3){
                  i++;
                  var specs=$(this).children(".left").text().split(/[&<>]/g);
                  console.log(i+"----"+specs);
                 //console.log(i+"----"+mp3+"---"+title);
                  db_insert(title,mp3,specs);
                }
              }
            });

          });

      } // end loop for db record looping
       
    }
  ); 






  
  //$("#topright > a").each(function() {
   // var link = $(this);
    //var title = link.attr("title");
    //var href = request_uri+link.attr("href");
    //var size = link.children("span").text();
    //console.log(title + " -> " + href+"-size--"+size);
    
  // });
   //console.log($("#margin div:last-child a").attr("href"));