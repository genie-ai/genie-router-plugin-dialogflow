const Apiai = require('api.ai')
let clients = {}
let accessToken = null
const debug = require('debug')('genie-router-plugin-dialogflow:brain')

function start (config) {
  return new Promise(function (resolve, reject) {
    if (!config.accessToken) {
      reject(new Error('No accessToken configured'))
      return
    }

    // Test if a client can be initialized
    client = new Apiai({
      token: config.accessToken,
      session: 'test-session'
    })
    accessToken = config.accessToken
    debug('Dialogflow client started.')
    resolve({process: process})
  })
}

function process (message) {
  const sessionId = {sessionId: getSessionId(message)}
  if (!clients.sessionId) {
    debug('Initialized new Dialogflow client for', sessionId)
    clients.sessionId = new Apiai({
      token: accessToken,
      session: 'test-session'
    })
  }
  return clients.sessionId.text(message.input, sessionId)
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

/**
 * Uses the message.userId / message.sessionId parameter, if
 * they are set, they are used to scope the session in the dialogflow bot.
 * If not, a static value is used, which means that the chatsession is shared
 * across all clients.
*/
function getSessionId (message) {
  if (message.sessionId) {
    return message.sessionId
  }
  if (message.userId) {
    return message.userId
  }

  return 'dialogflow-session'
}

module.exports = {start: start}
