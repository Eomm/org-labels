# org-labels
Manage the GitHub labels of your organization repositories.

You will get the same color and description for the same label across all your repositories!

## Usage

Quick and dirty application to sync all the repositories' labels of an organization.
To run it:

- Clone the repository
- Install the dependencies with `npm install`
- Create a `.env` file with the following content:

```bash
ORG=name of the organization
GITHUB_TOKEN=your github token
```

- Configure the `label-config.json` file as documented [here](https://github.com/Financial-Times/github-label-sync#label-config-file)
- Finally, run the application with `npm start`


## License

MIT