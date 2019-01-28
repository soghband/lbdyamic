const fsextra = require('fs-extra');
const { exec } = require('child_process');

fsextra.copy('./src/app/dynamic', './lib/dist-lib', err => {
  if (err) return console.error(err);
  console.log('Copied files');
  createDeclarations();
});

function createDeclarations() {
  exec('cd lib && tsc index.ts --declaration', () => {
    console.log('Generated declarations (and some JS files...)');
    createPackageJson();
  });
}

function createPackageJson() {
  const packageJSON =  {
    "name": "lbdynamic",
    "version": "1.1.10",
    "description": "Dynamic From For Angular 4",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/soghband/lbdynamic"
    },
    "keywords": [
      "Angular",
      "Angular2",
      "Angular4",
      "Library",
      "Example"
    ],
    "author": "soghband@gmail.com",
    "license": "MIT",
    "bugs": {
      "url": "https://github.com/soghband/lbdynamic/issues"
    },
    "homepage": "https://github.com/soghband/lbdynamic#readme",
    "types": "index.d.ts"
  };
  fsextra.writeJson('./lib/dist-lib/package.json', packageJSON, {spaces: 2}, err => {
    if (err) return console.error(err);
    console.log('Created package.json');
  });

}
