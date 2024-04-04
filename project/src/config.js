import dotenv from 'dotenv';

dotenv.config();

export const JIRA_DOMAIN = process.env.JIRA_DOMAIN;
export const EMAIL = process.env.EMAIL;
export const API_TOKEN = process.env.API_TOKEN;
export const apiURL = process.env.API_URL;
export const authToken = process.env.AUTH_TOKEN;
export const channel = process.env.CHANNEL;
export const project = process.env.PROJECT;
export const projectName = process.env.PROJECT_NAME
