const path = require('path');

module.exports = {
    i18n: {
        locales: ['sr', 'en'],
        defaultLocale: 'sr',
    },
    localePath: path.resolve('./public/locales')
}