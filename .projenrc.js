const { AwsCdkConstructLibrary, License } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'David Michael',
  authorAddress: '1.david.michael@gmail.com',
  cdkVersion: '1.118.0',
  defaultReleaseBranch: 'main',
  name: 'cloudwatch-alarms-to-teams',
  repositoryUrl: 'https://github.com/1davidmichael/Cloudwatch-Alarms-to-Chat-Platforms',

  // cdkDependencies: undefined,        /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,    /* AWS CDK modules required for testing. */
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // releaseWorkflow: undefined,        /* Define a GitHub workflow for releasing from "main" when new versions are bumped. */
  license: 'Apache-2.0',
  autoDetectBin: false,
  compat: true,
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-python',
    '@aws-cdk/aws-lambda-event-sources',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-cloudwatch-actions',
  ],
  devDeps: [
    'esbuild',
  ],
  python: {
    distName: 'cloudwatch-alarms-to-teams',
    module: 'cloudwatch_alarms_to_teams',
  },
});

const gitExcludes = ['.vim/', '.vscode/', '.venv/', 'file:/'];

project.gitignore.addPatterns(...gitExcludes);
project.synth();
