const { Octokit } = require("@octokit/core");
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
      
      // Check the status of each deployment
      const statuses = await octokit.request('GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses', {
        owner,
        repo,
        deployment_id,
      });

      const isActive = statuses.data.some(status => status.state === 'success');
      
      // If not active, delete the deployment
      if (!isActive) {
        await octokit.request('DELETE /repos/{owner}/{repo}/deployments/{deployment_id}', {
          owner,
          repo,
          deployment_id,
        });
        console.log(`Deleted inactive deployment: ${deployment_id}`);
      }
    }
  } catch (error) {
    console.error("Error deleting deployments:", error);
  }
}

deleteInactiveDeployments();
