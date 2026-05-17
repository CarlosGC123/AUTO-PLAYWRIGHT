const { generate } = require('multiple-cucumber-html-reporter');
const path = require('path');

generate({
  jsonDir: path.resolve('./reports'),
  reportPath: path.resolve('./reports/html'),
  openReportInBrowser: false,
  saveCollectedJSON: false,
  metadata: {
    browser: {
      name: process.env.BROWSER || 'chromium',
      version: 'Latest'
    },
    device: 'Desktop',
    platform: {
      name: 'Windows',
      version: '11'
    }
  },
  customData: {
    title: 'Test Execution Report',
    data: [
      { label: 'Project',   value: 'Sauce Demo Automation' },
      { label: 'Framework', value: 'Playwright + Cucumber' },
      { label: 'Pattern',   value: 'Screenplay-Inspired' },
      { label: 'Date',      value: new Date().toLocaleDateString() }
    ]
  }
});

console.log('\nHTML Report generated at: reports/html/index.html\n');
