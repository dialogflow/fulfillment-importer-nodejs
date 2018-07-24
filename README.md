# Dialogflow Fulfillment: Importer Sample

A simple sample showing how to use Dialogflow's Importer for Alexa Skills to import a Alexa Skill to Dialogflow, deploy it to the Google Assistant developer platform, Actions on Google, and export the Dialogflow agent back to Amazon's Alexa Skill Kit platform.

Check out [this](https://dialogflow.com/docs/examples/importer-for-alexa-skills) for a comprehensive walkthrough.

This sample is divided into two parts: `skill` and `dialogflow` directories.  
+ The `skill` directory has all the files for deployment and fulfillment of a simple Alexa Skill that responds to a single query for the most popular videos on YouTube.  When deployed properly to Lambda and Alexa, the Alexa Skill responds with the 5 most popular YouTube videos in the United States at the time.  
+ The `dialogflow` directory contains all the Alexa Skill's files imported into Dialogflow. These include the Dialogflow agent exported to a zip file and fulfillment designed to be hosted on Cloud Functions for Firebase.

## Setup Instructions

### Steps to deploy a Dialogflow Agent to Actions on Google
1. Go to **Add to Dialogflow** button below to **Create Agent**:

  [![Alexa-Importer](https://storage.googleapis.com/dialogflow-oneclick/deploy.svg "Alexa-Importer")](https://console.dialogflow.com/api-client/oneclick?templateUrl=https://storage.googleapis.com/dialogflow-oneclick/alexa-importer-agent.zip&agentName=Alexa-Importer-sample)
2. Go to the settings ⚙ > **Export and Import** tab > **Restore from Zip**.
  + Upload the `dialogflow/DialogflowAgent.zip` file located in this repo.
3. Deploy the Fulfillment webhook provided in the `dialogflow/functions` folder using [Google Cloud Functions for Firebase](https://firebase.google.com/docs/functions/):
   1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com).
      + You can find the `PROJECT ID` under settings ⚙ in the **Firebase Console > Project Settings > General** tab
   2. Setup/Initialize Firebase SDK for Cloud Functions. For further info<sup> a.</sup>
        + Run the following
        ```shell
        $ npm install -g firebase-tools
        $ firebase login
        Allow Firebase to collect anonymous CLI usage and error reporting information? Y/n.
        ```
          + Press either Y/N and then you will automatically be brought to the browser to login and authenticate. When successfully authenticated you will see a success message in terminal.

        ```shell
        $ cd dialogflow/functions
        $ npm install
        $ firebase use <PROJECT_ID>
        $ firebase deploy --only functions:popularVideos
        ```
          + The deploy command will output the project console link and visit in browser
          + More generally: `$ firebase deploy --only functions:FUNCTION_NAME`
4. Once in Firebase Console, from the left menu, go to **> Functions > Dashboard >** copy link listed under Event column
          // EX: https://us-central1-<PROJECT_ID>.cloudfunctions.net/<FUNCTION_NAME>

5. Back in the Dialogflow console, from the left menu, select **Fulfillment >** Enable **Webhook >** set the value of **URL** to the `Function URL` from the previous step **> Save**.
6. Select **Integrations** from the left navigation menu and open the **Settings** menu for Actions on Google.
7. Select **Test**.
8. Select **View** to open the Actions on Google simulator.
  + Type `Talk to my test app` in the simulator or
  + Say `OK Google, talk to my test app`


<sup>a.</sup>[Further info on initializing Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk). Make sure to reply "N" when asked to overwrite existing files by the Firebase CLI.

### Steps to deploy the Alexa Skill to Alexa Skills Kit
Check out [Build An Alexa Fact Skill](https://github.com/alexa/skill-sample-nodejs-fact/blob/en-US/instructions/1-voice-user-interface.md) for information on how to deploy an Alexa Skill.


## How to make contributions?
Please read and follow the steps in the [CONTRIBUTING.md](CONTRIBUTING.md).

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
