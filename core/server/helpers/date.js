// # Date Helper
// Usage: `{{date format="DD MM, YYYY"}}`, `{{date updated_at format="DD MM, YYYY"}}`
//
// Formats a date using moment-timezone.js. Formats published_at by default but will also take a date as a parameter

var moment          = require('moment-timezone'),
    config          = require('../config'),
    date,
    timezone;

date = function (date, options) {
    if (!options && date.hasOwnProperty('hash')) {
        options = date;
        date = undefined;
        timezone = options.data.blog.timezone;

        // set to published_at by default, if it's available
        // otherwise, this will print the current date
        if (this.published_at) {
            date = moment(this.published_at).tz(timezone).format();
        }
    }

    // ensure that context is undefined, not null, as that can cause errors
    date = date === null ? undefined : date;

    var f = options.hash.format || 'MMM DD, YYYY',
        locale = options.hash.locale || config.locale,
        timeago = options.hash.timeago,
        timeNow = moment().tz(timezone),
        mdate = moment(date).locale(locale),
        date;

    if (timeago) {
        date = timezone ?  mdate.tz(timezone).from(timeNow) : mdate.fromNow();
    } else {
        date = timezone ? mdate.tz(timezone).format(f) : mdate.format(f);
    }

    return date;
};

module.exports = date;
