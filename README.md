This is a plugin for the [https://github.com/matueranet/genie-router](genie-router)
project. It communicates with an agent configured on the [Dialogflow](https://dialogflow.com) service
to create a brain that generates a reply to the input from a client.

# Dialogflow Setup

Create an agent at dialogflow.com and set it up with intents, fulfillments, etc. Dialogflow requires
an elaborate method for setting up the Api Access, via Google Cloud Service Accounts, follow
[this guide](https://dialogflow.com/docs/reference/v2-auth-setup) to obtain a JSON file with the project.
You need a **Dialogflow API Client** service account. It is not necessary to set the environment variable as explained in the guide, this plugin will take care of that.

Legacy projects are no longer supported by this plugin. Version 2.0.0 does support Legacy projects, that
can be found [here](https://github.com/genie-ai/genie-router-plugin-dialogflow/releases/tag/2.0.0).

# Configuration

Your private API Key was generated in the Dialogflow setup step. The projectId can be obtained in your [Dialogflow Dashboard](https://console.dialogflow.com):

1. Click on the gear icon, to the right of the agent name.
2. The projectId is listed under the GOOGLE PROJECT section

At the plugin location ($HOME/.genie-router), type:

    npm install --save @genie-ai/genie-router-plugin-dialogflow


Add the Dialogflow API key for the agent to the `config.json` file of _genie-router_,
in the `plugins` attribute.

```json
{
  "dialogflow": {
    "privateKeyFile": "/path/to/file.json",
    "projectId": "<projectId>",
    "languageCode": "en"
  }
}
```

The languageCode is optional, and will default to 'en'. [Dialogflow language overview](https://dialogflow.com/docs/reference/language)
