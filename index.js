import {  project } from './project/src/config.js';
import { sendMessageToAPI, fetchIssuesFromJira } from './project/src/releaseNotesService.js';

import { organizeIssues } from './project/src/issueOrganization.js'
import { generateMessage } from './project/src/messageGeneration.js'


async function fetchDoneIssues(project)
 {
  try {
    const issues = await fetchIssuesFromJira(project);
    const { organizedIssues, techDebtIssues, othersIssues } = organizeIssues(issues);
    const message = await generateMessage(organizedIssues, techDebtIssues, othersIssues, project);
    console.log(message)
//    await sendMessageToAPI(message);
  } catch (error) {
    console.error("Error in fetchDoneIssues:", error);
  }
}

fetchDoneIssues(project);

