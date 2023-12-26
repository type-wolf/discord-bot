## README

### 💡This program aims to develop discord.js and express with typescript

### **Step1**: Set the following environment variables to `.env`

```txt
BOT_TOKEN=
CLIENT_ID=
GUILD_ID=
```

#### BOT_TOKEN

-   `Require`: true
-   `description`: Token issued when you create a Bot in DiscordDeveloper.
-   `GetStep`
    -   Step1: Access [DiscordDevelopPortal](https://discord.com/developers/applications)
    -   Step2: Click "New Application" Button
    -   Step3: Copy the value of "TOKEN" listed in Bot
        -   🌟 Click the "Reset Token" button if it is not displayed

#### CLIENT_ID

-   `Require`: true
-   `description`: ID that identifies the DiscordBot
-   `GetStep`
    -   Step1: Access [DiscordDevelopPortal](https://discord.com/developers/applications)
    -   Step2: Copy the value of "APPLICATION ID" listed in General Information

#### GUILD_ID

-   `Require`: true
-   `description`: The ID of the GUILD where you plan to install the bot you created

### **Step2**: Set environment variables for the repository

-   Go to 'Secrets and variables' in the repository settings

#### HEROKU_API_KEY

-   `Require`: true
-   `description`: Heroku ApiKey provided for each account
-   `GetStep`
    -   Step1: Access [HerokuDashboard](https://dashboard.heroku.com/account)
    -   Step2: Scroll to the bottom and find 'ApiKey' and copy it

#### HEROKU_APP_NAME

-   `Require`: true
-   `description`: Name of Heroku app to be automatically deployed
-   `GetStep`
    -   Step1: Access [HerokuMyApps](https://dashboard.heroku.com/apps)
    -   Step2: Set a name for your app (create one if you don't have one)

#### HEROKU_EMAIL

-   `Require`: true
-   `description`: Email address of the Heroku account you are using
