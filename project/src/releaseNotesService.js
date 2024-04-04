import fetch from 'node-fetch';

import { JIRA_DOMAIN, apiURL, authToken, channel, EMAIL, API_TOKEN } from './config.js';

const auth = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString('base64');

export async function fetchIssuesFromJira(project) {
    const url = `https://${JIRA_DOMAIN}/rest/api/3/search?jql=project=${project} AND status=Done AND updated >= -5d ORDER BY updated DESC&maxResults=100`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(project)
      console.log(data)
      return data.issues;
    } catch (error) {
      console.error("Could not fetch done issues:", error);
      throw error; // Rethrow to handle in calling function
    }
}

export async function sendMessageToAPI(message) {
try {
    const response = await fetch(apiURL, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        message: message,
        channel: channel
    })
    });

    console.log(response)
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }

    const responseData = await response.text();
    console.log("API Response:", responseData);
} catch (error) {
    console.log(error)
    console.error("Error calling the API:", error);
}
}