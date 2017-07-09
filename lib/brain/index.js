const uuid = require('uuid/v4')
const Apiai = require('api.ai')
let client = null
const session = uuid()
const debug = require('debug')('genie-router-api.ai:brain')

function start (config) {
  return new Promise(function (resolve, reject) {
    if (!config.accessToken) {
      reject(new Error('No accessToken configured'))
      return
    }

    client = new Apiai({
      token: config.accessToken,
      session: session
    })
    debug('api.ai client started.')
    resolve({process: process})
  })
}

function process (message) {
  return client.text(message.input, {sessionId: session})
    .then(function (response) {
      if (response.status.code !== 200) {
        throw new Error('Non-ok response received from api.ai %s', response.status.message)
      }
      return {output: response.result.fulfillment.speech}
    })
    .catch(function (err) {
      debug('Error received from api.ai after sending input `%s`: %s', message.input, err)
    })
}

module.exports = {start: start}
