This is a plugin for the [https://github.com/matueranet/genie-router](genie-router)
project. It communicates with an agent configured on the [Dialogflow](https://dialogflow.com) service
to create a brain that generates a reply to the input from a client.

# Dialogflow Setup

Create an agent at dialogflow.com and set it up with intents, fulfillments, etc. After that
is done, copy the *Client access token* from the General settings screen of the agent.

# Configuration

Your Dialogflow client access token can be obtained in your [Dialogflow Dashboard](https://console.dialogflow.com),
in the General Settings for your agent.

Add the Dialogflow API key for the agent to the configuration of _genie-router_,
in the `plugins` attribute.

```
{
  "dialogflow": {
    "accessToken": "<dialogflow token>"
  }
}
```
