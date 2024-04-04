export function organizeIssues(issues) {
    let organizedIssues = {};
    let othersIssues = {};
    let techDebtIssues = {}; // Separate container for Tech Debt issues
  
    issues.forEach(issue => {
      const epicName = issue.fields["parent"] ? issue.fields["parent"].fields.summary : 'Others';
      const assignee = issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned';
      const taskSummary = issue.fields.summary;
      const updated = issue.fields.updated;
      const description = issue.fields.description ? extractText(issue.fields.description.content) : "";
  
      let targetObject;
  
      // Decide the target object based on the epic name
      if (epicName === 'Tech Debt') {
        targetObject = techDebtIssues; // Specific container for Tech Debt
      } else if (epicName === 'Others') {
        targetObject = othersIssues;
      } else {
        targetObject = organizedIssues;
      }
  
      // Initialize epicName and assignee keys if they don't exist
      if (!targetObject[epicName]) {
        targetObject[epicName] = {};
      }
      if (!targetObject[epicName][assignee]) {
        targetObject[epicName][assignee] = [];
      }
      
      // Push the issue details to the appropriate list
      targetObject[epicName][assignee].push({ taskSummary, updated, description });
    });
  
    return { organizedIssues, techDebtIssues, othersIssues };
  }
  
function extractText(nodes) {
    let extractedText = '';
  
    nodes.forEach(node => {
      if (node.type === 'paragraph') {
        node.content.forEach(content => {
          extractedText += content.text + ', '; // Assuming there's a text property
        });
      } else if (node.type === 'bulletList' || node.type === 'listItem') {
        node.content.forEach(item => {
          // If the item itself is a paragraph, extract text directly
          if (item.type === 'paragraph') {
            item.content.forEach(content => {
              extractedText += '- ' + content.text + ', '; // Assuming there's a text property
            });
          } 
        });
      } 
    });
  
    return extractedText;
}