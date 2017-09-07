/**
 * @file mock entry
 * @author X-Jray(z.xuanjian@gmail.com)
*/

module.exports = function (req, res) {
    let filePath = req.filePath;
    delete require.cache[require.resolve(filePath)];
    let data = require(filePath)();
    if (req.query.callback) {
        res.end(`${req.query.callback}(${JSON.stringify(data)})`);
    }
    else {
        res.json(data);
    }    
};
