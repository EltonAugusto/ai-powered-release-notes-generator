import { spawn } from 'child_process';

const prompt = "<s>[INST] <<SYS>>\nYou are a technical writer tasked with summarizing multiple completed project tasks into a single, cohesive sentence for documentation purposes. This summary should reflect the collective actions that have been taken and the outcomes achieved across all tasks, using past tense to indicate completion. The challenge is to distill the essence of several tasks into one clear, comprehensive, and factual sentence. Avoid breaking down the summary into separate points for each task. Avoid introducing new elements or assumptions not present in the original. If the details of the tasks lack clarity or are too broad, focus on creating a summary that accurately captures the overall progress and key achievements, without making assumptions or extrapolations.\n<</SYS>>\nTasks to be summarized in one sentence of few words:"
const prompt2 = "<s>[iNS] <<SYS>> Simplify the following detailed task summary into a shorter, clear sentence without losing its essence. Focus on the main outcome and actions taken, using past tense to indicate completion. The goal is to retain the core information about the project's impact and achievements in a more concise form. Avoid introducing new elements or assumptions not present in the original summary. Please ensure the simplified summary is about few words.<</SYS>> Task Summary to Simplify:"

export async function SummarizeTasks(question) {
  return await askQuestionAsync(`${prompt} ${question}\n[/INST]`);
}

export async function SimplifyText(question) {
  return await askQuestionAsync(`${prompt2} ${question}\n[/INST]`);
}

async function askQuestionAsync(question) {
    return new Promise((resolve, reject) => {
      try {
        const ollamaProcess = spawn('ollama', ['run', 'llama2:13b']);
        let outputChunks = [];

        ollamaProcess.stdout.on('data', (data) => {
          outputChunks.push(data);
        });

        ollamaProcess.on('close', (code) => {
          if (code === 0) {
            const output = outputChunks.map(chunk => chunk.toString()).join("");
            resolve(output);
          } else {
            reject(new Error(`Process exited with code ${code}`));
          }
        });

        ollamaProcess.stdin.write(question + "\n");
        ollamaProcess.stdin.end();
      } catch (e) {
        console.error('Error asking question to Ollama', e);
        reject(new Error('Error asking question to Ollama'+ e));
      }

    });
};
