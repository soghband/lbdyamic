const fsextra = require('fs-extra');
const Input = require('prompt-input');
const fs = require('fs');
const {exec} = require('child_process');
let version;
let input = new Input({
	name: 'first',
	message: 'Enter version:'
});
input.run()
	.then(function (answers) {
		version = answers;
		coptLib()
	});

function coptLib() {
	fsextra.copy('./src/app/dynamic', './lib/dist-lib', err => {
		if (err) return console.error(err);
		console.log('Copied Library files');
		copyCss();
	});
}

function copyCss() {
	fs.copyFile('./src/assets/css/dynamic-form.css', './lib/src/css/dynamic-form.css', err => {
		if (err) return console.error(err);
		console.log('Copied Asset files');
		createDeclarations();
	})
}
;

function createDeclarations() {
	exec('cd lib && tsc index.ts --declaration', () => {
		console.log('Generated declarations (and some JS files...)');
		createPackageJson();
	});
}

function createPackageJson() {
	const packageJSON = {
		"name": "lbdynamic",
		"version": version,
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
		console.log('Created lib package.json');
		modifyVersionJaon();
	});
}

function modifyVersionJaon() {
	let data = fs.readFileSync("./lib/package.json");
	let package = JSON.parse(data);
	package.version = version;
	fsextra.writeJson('./lib/package.json', package, {spaces: 2}, err => {
		if (err) return console.error(err);
		console.log('Created package.json');
	});
}
