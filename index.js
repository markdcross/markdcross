require('isomorphic-unfetch');
const { promises: fs } = require('fs');
const path = require('path');

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), './README.template.md'))
  ).toString('utf-8');

  const affirmation = await (
    await fetch('https://www.affirmations.dev/')
  ).json();

  const readme = readmeTemplate.replace(
    '{affirmation}',
    affirmation.affirmation
  );

  await fs.writeFile('README.md', readme);
}
main();