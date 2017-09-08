/**
 * @file util
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var util = {
    cmptName2Tag: function (cmptName) {
        var tagName = cmptName.trim().replace(/([A-Z])/g, function (match, p1) {
            if (match) {
                return '-' + p1.toLowerCase();
            }
        });
        return 'san' + tagName;
    }
}

module.exports = util;
