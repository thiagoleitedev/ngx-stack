'use strict'
const config = require('config')
const chalk = require('chalk')

const datasources = {}

if (config.has('mongodb') && config.get('mongodb.url')) {
  console.log(chalk.magenta('[data-sources] Configure MongoDB'))
  datasources['db'] = {
    name: 'db',
    connector: 'mongodb',
    url: config.get('mongodb.url'),
  }
}

if (config.has('smtp') && config.get('smtp.host') && config.get('smtp.port')) {
  console.log(chalk.magenta('[data-sources] Configure SMTP'))
  datasources['mail'] = {
    connector: 'mail',
    transports: [
      {
        type: 'smtp',
        host: config.get('smtp.host'),
        port: config.get('smtp.port'),
      },
    ],
  }
}

if (config.has('storage') && config.get('storage.path')) {
  console.log(chalk.magenta('[data-sources] Configure Storage'))
  datasources['storage'] = config.storage
}

module.exports = datasources
