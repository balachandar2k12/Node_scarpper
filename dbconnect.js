var mysql = require('mysql');
var client = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'mp3_scrapper'
});
client.connect();
	client.query("SELECT * FROM temp_urls",
		function(err, results, fields) {
			if (err) throw err;
			for (var index in results) {
				console.log(results[index].uri);
			}
			
		}
	); 
