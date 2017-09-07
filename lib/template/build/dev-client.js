/**
 * @file for hot-reload
 * @author X-Jray(z.xuanjian@gmail.com)
 */

const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload();
    }
});
