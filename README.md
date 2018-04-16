# Dialogflow: Fulfillment Importer Sample

A simple sample showing how to use Dialogflow's Importer for Alexa Skills to import a Alexa Skill to Dialogflow, deploy it to the Google Assistant developer platform, Actions on Google, and export the Dialogflow agent back to Amazon's Alexa Skill Kit platform.

Please see https://dialogflow.com/docs/examples/importer-for-alexa-skills for a comprehensive walkthrough of this sample.

## Setup Instructions
This sample is divided into two parts, the first in the <code>skill</code> directory and the second in the <code>apiai</code> directory.  The directory <code>skill</code> has all the files for deployment and fulfillment of a simple Alexa Skill that responds to a single query for the most popular videos on YouTube.  When deployed properly to Lambda and Alexa, the Alexa Skill responds with the 5 most popular YouTube videos in the United States at the time.  The directory <code>apiai</code> contains all the Alexa Skill's files imported into Dialogflow. These include the Dialogflow agent exported to a zip file and fulfillment designed to be hosted on Cloud Functions for Firebase.

### Steps to deploy the Dialogflow agent to Actions on Google
1. [Sign up](https://console.dialogflow.com/api-client/authorize_url_google/nopopup) or [login](https://console.dialogflow.com/api-client/#/login) to your Dialogflow account.
1. Open the Dialogflow console, click on *Create Agent* in the left navigation and fill in the required fields.
1. Click *Save* to save the project.
1. Click on the gear icon to see the project settings.
1. Select *Export and Import*.
1. Select *Restore from zip*. Follow the directions to restore from the `apiai/APIAIAgent.zip` file in this repo.
1. Deploy the fulfillment webhook provided in the `apiai/functions` folder using [Google Cloud Functions for Firebase](https://firebase.google.com/docs/functions/):
   1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com) if you don't have one already.
   1. Follow the instructions to [set up and initialize Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk). Make sure to reply "N" when asked to overwrite existing files by the Firebase CLI.
   1. Run `firebase deploy --only functions` and take note of the endpoint where the fulfillment webhook has been published. It should look like `Function URL (conversationComponent): https://us-central1-YOUR_PROJECT.cloudfunctions.net/conversationComponent`
1. Go back to the Dialogflow console and select *Fulfillment* from the left navigation menu. Enable *Webhook*, set the value of *URL* to the `Function URL` from the preiovus step, then click *Save*.
1. Select *Integrations* from the left navigation menu and open the *Settings* menu for Actions on Google.
1. Click *Test*.
1. Click *View* to open the Actions on Google simulator.
1. Type `Talk to my test app` in the simulator, or say `OK Google, talk to my test app` to any Actions on Google enabled device signed into your developer account.

### Steps to deploy the Alexa Skill to Alexa Skills Kit
1. Please see [Alexa's Build An Alexa Fact Skill documentation](https://github.com/alexa/skill-sample-nodejs-fact/blob/master/step-by-step/1-voice-user-interface.md) for information on how to deploy the Alexa Skill


## How to make contributions?
Please read and follow the steps in the [CONTRIBUTING.md](CONTRIBUTING.md).

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
