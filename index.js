
const dotenv = require('dotenv')
const githubLabelSync = require('github-label-sync')
const labelConfig = require('./label-config.json')

dotenv.config()

const ghToken = process.env.GITHUB_TOKEN
const org = process.env.ORG

run(org, ghToken)

async function run (org, token) {
  const repos = await readGitHubRepositoryList(org, token)
  console.log(`Found ${repos.length} repositories in ${org}...`)
  console.log('========================================')

  let i = 0
  const max = 999
  for (const repo of repos) {
    i++
    console.log(`Syncing labels for ${i}/${repos.length} ${repo.full_name}...`)
    try {
      const result = await githubLabelSync({
        accessToken: token,
        repo: repo.full_name,
        allowAddedLabels: true,
        // dryRun: true,
        labels: labelConfig
      })

      result.forEach((label) => {
        console.log(`\t${label.type} ${label.name}`)
      })
    } catch (error) {
      console.error(`Error syncing labels for ${repo.full_name}`)
      console.error(error)
    }
    console.log('========================================')
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (i >= max) {
      break
    }
  }
}

async function readGitHubRepositoryList (org, token) {
  const url = `https://api.github.com/orgs/${org}/repos?access_token=${token}`
  const options = {
    method: 'GET',
    headers: {
      'User-Agent': 'nodejs',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`
    }
  }
  const res = await fetch(url, options)
  const repos = await res.json()
  return repos
}
