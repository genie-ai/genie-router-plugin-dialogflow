const dialogflow = require('dialogflow');
const debug = require('debug')('genie-router-plugin-dialogflow:brain');

const clients = {};
let projectId = null;
let sessionClient = null;
let languageCode = 'en-US';

/**
 * Uses the message.userId / message.sessionId parameter, if
 * they are set, they are used to scope the session in the dialogflow bot.
 * If not, a static value is used, which means that the chatsession is shared
 * across all clients.
*/
function getSessionId(message) {
    if (message.sessionId) {
        return message.sessionId;
    }
    if (message.userId) {
        return message.userId;
    }

    return 'dialogflow-session';
}

async function processInput(message) {
    const sessionId = getSessionId(message);
    if (!clients[sessionId]) {
        debug('Initialized new Dialogflow client for', sessionId);
        clients[sessionId] = sessionClient.sessionPath(projectId, sessionId);
    }
    const clientPath = clients[sessionId];

    // The text query request.
    const request = {
        session: clientPath,
        queryInput: {
            text: {
                text: message.input,
                languageCode,
            },
        },
    };

    try {
        const response = await sessionClient.detectIntent(request);
        const result = response[0].queryResult;

        debug(`Response: ${result.fulfillmentText}`);
        return { output: result.fulfillmentText };
    } catch (err) {
        debug('Error received from dialogflow after sending input `%s`: %s', message.input, err);
        debug(request);
        throw err;
    }
}

async function start(config) {
    if (!config.projectId) {
        throw new Error('No projectId configured');
    }
    if (!config.privateKeyFile) {
        throw new Error('No privateKeyFile provided.');
    }
    if (config.languageCode) {
        languageCode = config.languageCode; // eslint-disable-line prefer-destructuring
    }
    // Dialogflow SDK requires that this env variable is set
    process.env.GOOGLE_APPLICATION_CREDENTIALS = config.privateKeyFile;
    sessionClient = new dialogflow.SessionsClient();

    // Test if a client can be initialized
    sessionClient.sessionPath(config.projectId, 'test-session');
    projectId = config.projectId; // eslint-disable-line prefer-destructuring
    debug('Dialogflow client started.');
    return { process: processInput };
}

module.exports = { start };
