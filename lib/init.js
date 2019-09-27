'use strict';

const Watcher = require('./watcher');

module.exports = appOrAgent => {
  // 拿到日志
  const logger = appOrAgent.coreLogger;

  const watcher = appOrAgent.watcher = appOrAgent.cluster(Watcher)
    .delegate('watch', 'subscribe')
    .create(appOrAgent.config)
    .on('info', (...args) => logger.info(...args))
    .on('warn', (...args) => logger.warn(...args))
    .on('error', (...args) => logger.error(...args));

  appOrAgent.beforeStart(async () => {
    // 调用ready，开始watch
    await watcher.ready();
    logger.info('[egg-watcher:%s] watcher start success', appOrAgent.type);
  });
};
