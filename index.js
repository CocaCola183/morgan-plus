var morgan = require('morgan');
var fs = require('fs-extra');
var merge = require('merge');
var moment = require('moment');

module.exports = function(format, options, path) {
	if(path && typeof(path === 'string')) {
		try{
			fs.mkdirsSync(path);
		} catch(e) {
			console.log(e.message);
			return morgan(format, options);
		}
		var log_dir = path[path.length -1] === '/' ? path : path + '/';
  	var accessLogStream = fs.createWriteStream(log_dir + moment().format('YYYY-MM-DD') + '.log', {flags: 'a', encoding: 'utf8'})
  	return morgan(format, merge(options, {stream: accessLogStream}));

	} else {
		return morgan(format, options);
	}
}

module.exports.compile = morgan.compile
module.exports.format = morgan.format
module.exports.token = morgan.token