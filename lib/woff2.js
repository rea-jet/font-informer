var parser = require('woff2-parser');
var Promise = global.Promise || require('es6-promise').Promise;
var fontStyle = require('./font-style.js');

module.exports = function (stream) {
	return new Promise(function(resolve, reject) {
		parser(stream).then(function(results) {
			var name = results.name.nameRecords.English.typographicFamily || results.name.nameRecords.English.fontFamily;
			var subFamily = results.name.nameRecords.English.typographicSubFamily || results.name.nameRecords.English.fontSubFamily;
			if (name.indexOf(subFamily) == -1) {
				name += " - " + subFamily;
			}

			resolve({
				type: "woff2",
				name: name,
				weight: results["OS/2"].weight.value,
				style: fontStyle(results["OS/2"].selection)
			});
		}, reject);
	});
};
