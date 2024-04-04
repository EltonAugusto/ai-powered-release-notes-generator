# Release Notes App

## Overview

This Node.js project automates the retrieval and organization of completed issues from a JIRA project. The script is designed to fetch issues marked as "Done" in the past week, organize them by epic and assignee, and then format a comprehensive update message. This message can be customized per project and is intended to be sent to a specified communication channel, facilitating team updates and project management.

![Architecture](https://i.imgur.com/jYRORp9.png "This is a to-be architecture model")



## Features

- Fetches completed issues from a specified JIRA project.
- Organizes issues by epic and assignee for improved clarity.
- Generates a detailed update message, customizable for different projects.
- Supports sending the generated message to a specified Internal Notifier endpoint, facilitating integration with Slack.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed on your local machine.
- Ollama installed on your local machine.
- Access to a JIRA project and an API token for authentication. You can generate a token in the `Security` section of your Atlassian account (https://id.atlassian.com/manage-profile/security/api-tokens)
- An endpoint to receive the generated message (if using the messaging feature).

**Ollama setup and warning**

Ollama needs to download the full model before it is able to be used. I recommend to run the following command before using the script.
```shell
ollama run llama2:13b
```

Even after the download of the model, Ollama is relatively slow to startup and answer questions. Expect the script to look on hold for some time.



## Setup

1. **Clone the repository**

   Start by cloning this project to your local machine to get started.

2. **Install dependencies**

   Navigate to the project directory and run:

   ```sh
   npm install node-fetch dotenv

3. **Configure environment variables**

   Create a `.env` file in the project root with the following variables:
        JIRA_DOMAIN=your_jira_domain
        EMAIL=your_email_address
        API_TOKEN=your_api_token
        API_URL=your_api_url_for_sending_messages
        AUTH_TOKEN=your_auth_token_for_api
        CHANNEL=your_target_channel_or_endpoint
        PROJECT=your_project_key
        PROJECT_NAME=your_project_extended_name

4. **Usage**

   The project is now ready to be executed with:

   ```sh
   node index.js

## How It Works

It constructs a request to the JIRA API to fetch issues from a specified project that are marked as "Done" within the last week. Retrieved issues are organized by epic and assignee, providing a structured overview. A detailed message is generated, summarizing the completed tasks, customizable based on the project. The script then sends the generated message to a specified Internal Notifier endpoint, ensuring team members are updated with the latest project achievements.

## Customization

You can customize the message format or the criteria for fetching issues by modifying the `generateMessage` and `fetchIssuesFromJira` functions, respectively. This allows the script to be flexibly adapted to different project needs or communication styles.

## Security

Sensitive information is managed through environment variables, ensuring that credentials and API tokens are not hard-coded into the script. Always keep your `.env` file secure and never share it publicly.

## Support

For support, contact Elton Tamilheiro

