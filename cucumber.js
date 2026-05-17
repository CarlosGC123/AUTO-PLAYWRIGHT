module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/hooks/**/*.ts', 'src/steps/**/*.ts'],
    paths: ['src/features/**/*.feature'],
    format: [
      'progress',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true,
    parallel: 0,
    timeout: 300_000
  }
};
