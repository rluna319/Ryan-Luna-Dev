// const { Octokit } = require("@octokit/core"); // CommonJS
import { Octokit } from "@octokit/core";
const owner = "rluna319";
const repo = "Developer-Portfolio";
const token = process.env.DEV_PORTFOLIO_GITHUB_API_TOKEN;

const octokit = new Octokit({
  auth: token,
});

async function deleteInactiveDeployments() {
  try {
    // Fetch all deployments
    const deployments = await octokit.request('GET /repos/{owner}/{repo}/deployments', {
      owner,
      repo,
    });

    for (const deployment of deployments.data) {
      const deployment_id = deployment.id;

      console.log('Checking deployment:', deployment_id);
      
      // Check the status of each deployment
      const statuses = await octokit.request('GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses', {
        owner,
        repo,
        deployment_id
      });

      const isInactive = statuses.data[0].state === 'inactive';
      
      // If not active, delete the deployment
      if (isInactive) {
        await octokit.request('DELETE /repos/{owner}/{repo}/deployments/{deployment_id}', {
          owner,
          repo,
          deployment_id,
        });
        console.log(`Deleted inactive deployment: ${deployment_id}`);
      } else {
        console.log(`Deployment is still active, skipping...`);
      }
    }
  } catch (error) {
    console.error("Error deleting deployments:", error);
  }
}

deleteInactiveDeployments();
