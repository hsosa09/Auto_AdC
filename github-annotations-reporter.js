// github-annotations-reporter.js
const { Reporter } = require('@playwright/test/reporter');
const path = require('path');

class GitHubAnnotationsReporter extends Reporter {
  onTestEnd(test, result) {
    const { status } = result;
    const annotations = [];
    const location = test.location || {};

    let annotationLevel;
    let message = '';

    if (status === 'passed') {
      annotationLevel = 'notice';
      message = `✅ PASSED: ${test.title}`;
    } else if (status === 'skipped') {
      annotationLevel = 'warning';
      message = `⏭️ SKIPPED: ${test.title}`;
    } else if (status === 'failed') {
      annotationLevel = 'failure';
      message = `❌ FAILED: ${test.title}\n\n${result.error?.message || ''}`;
    } else {
      return;
    }

    // Formatear la anotación en el formato que GitHub Actions entiende
    const annotation = `::${annotationLevel} file=${location.file},line=${location.line},col=${location.column}::${message}`;
    console.log(annotation);
  }
}

module.exports = GitHubAnnotationsReporter;
