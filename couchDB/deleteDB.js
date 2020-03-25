const nano = require('nano')('http://localhost:5984');
nano.db.destroy('reply');