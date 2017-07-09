This is a plugin for the [https://github.com/matueranet/genie-router](genie-router)
project. It communicates with an agent configured on the [api.ai](https://api.ai) service
to create a brain that generates a reply to the input from a client.

# api.ai Setup

Create an agent at api.ai and set it up with intents, fulfillments, etc. After that
is done, copy the *Client access token* from the General settings screen of the agent.

# Configuration

Your api.ai client access token can be obtained in your [api.ai Dashboard](https://console.api.ai),
in the General Settings for your agent.

Add the api.ai API key for the agent to the configuration of _genie-router_,
in the `plugins` attribute.

```
{
  "api-ai": {
    "accessToken": "<api.ai token>"
  }
}
```
