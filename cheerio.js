var request = require("request");
var cheerio = require("cheerio");
var request_uri="http://mp3skull.com";
var mysql = require('mysql');
var table="temp_urls";
var client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mp3_scrapper'
});
client.connect();

function db_insert(table, val) {
  var sql='insert into '+ table +' (uri) values ("' + val + '")';
      client.query(sql, function(err, res) {
      //client.query(sql);
      });
 }
//fetch base urls
request({
  uri: request_uri
  }, function(error, response, body) {
  var $ = cheerio.load(body);
  var i=0;
  $("#main div:nth-child(2) > a").each(function(){
  	var link = $(this);
  	var href = request_uri+link.attr("href");
    if(href){
     console.log(i+"----"+href);
      db_insert(table,href);
     }
  }); // End of Each

});
 
// // fetch top viewed urls
//  var top_uri=request_uri+"/top.html";
// request({
//   uri: top_uri
//   }, function(error, response, body) {
//   var $ = cheerio.load(body);
//   var i=0;
//   $("#content").each(function(){
//     var link = $(this).;
//     var href = request_uri+link.attr("href");
//     if(href){
//      console.log(i+"----"+href);
//       //db_insert(table,href);
//      }
//   }); // End of Each

// });

