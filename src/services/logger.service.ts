import { createLogger, format, transports } from 'winston';

const level = 'info';

var today = new Date();
var date =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time =
  today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
var dateTime = date + ' ' + time;

export const logger = createLogger({
  level,
  format: format.combine(
    format.errors({ stacks: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: `Ivy ${dateTime}` },
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});
