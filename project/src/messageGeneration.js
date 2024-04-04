import {SummarizeTasks, SimplifyText} from './ai.js';
import {projectName} from "./config.js";

export async function generateMessage(organizedIssues, techDebtIssues, othersIssues, project) {
  let message = `*${projectName}:* Release Notes :tada:\n`; // Default prefix if project type is unknown
  console.log('setup message:', message);
  const removeBrackets = (text) => text.replace(/\[.*?\]/g, '').trim();

  // Helper function to append issues to message asynchronously
  const appendIssuesToMessageAsync = async (issues) => {
    for (const epicName in issues) {
      let featuresLine = "";
      for (const assignee in issues[epicName]) {
        for (const task of issues[epicName][assignee]) {
          const taskSummary = removeBrackets(task.taskSummary).split('|').map(part => part.trim()).join('; ');
          featuresLine += `${taskSummary}; (${task.description}) `;
        }
      }
      featuresLine = featuresLine.trim().slice(0, -1);
      // Use askQuestionAsync for the epic's message part
      if (featuresLine.length > 0) {
        console.log('\n')
        console.log('featuresLine: ' + featuresLine)
        let answer = await SummarizeTasks(featuresLine);
        console.log('answer: ' + answer)
        let answer2 = `\n*${removeBrackets(epicName)}:* ${cleanAnswer(await SimplifyText(answer))}`;
        console.log('answer2: ' + answer2)
        message += answer2
      }
    }
  };

  // First, append all issues except for "Tech Debt" and "Others"
  await appendIssuesToMessageAsync(organizedIssues);

  // Then, check and append "Tech Debt" issues if they exist
  if (techDebtIssues['Tech Debt']) {
    await appendIssuesToMessageAsync({'Tech Debt': techDebtIssues['Tech Debt']});
  }

  // Finally, check and append "Others" issues
  if (othersIssues['Others']) {
    await appendIssuesToMessageAsync({'Others': othersIssues['Others']});
  }

  message += "\nThese are the updates from the last *7 days*.";

  return formatMessage(message);
}

function cleanAnswer(answer) {
  const colonIndex = answer.indexOf(":");
  if (colonIndex !== -1) {
    // Remove everything before and including the colon, and trim whitespace
    return answer.substring(colonIndex + 1).trim();
  }
  return answer; // Return the original answer if no colon is found
};

function formatMessage(message) {
  // Split the message into lines to process them
  const lines = message.split('\n');
  let formattedLines = [];
  let isPreviousLineEpic = false;

  lines.forEach((line, index) => {
    // Trim each line to remove leading and trailing whitespaces
    const trimmedLine = line.trim();

    // Check if the current line is an epic (starts and ends with "**")
    const isCurrentLineEpic = trimmedLine.startsWith('**') && trimmedLine.endsWith('**');

    // Add a newline before epics if the previous line wasn't an epic (excluding the first line)
    if (isCurrentLineEpic && isPreviousLineEpic && index !== 0) {
      formattedLines.push(''); // Add a newline to separate epics
    }

    // Skip adding empty lines, except as separators between epics
    if (trimmedLine !== '' || (isCurrentLineEpic && isPreviousLineEpic)) {
      formattedLines.push(trimmedLine);
    }

    // Update the flag to indicate if the current line is an epic for the next iteration
    isPreviousLineEpic = isCurrentLineEpic;
  });

  // Join the processed lines back into a single string with a newline character
  return formattedLines.join('\n\n');
}
