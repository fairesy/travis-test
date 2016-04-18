[![Build Status](https://travis-ci.org/fairesy/travis-test.svg?branch=master)](https://travis-ci.org/fairesy/travis-test)
# travis-test

## require
```
npm install yo -g
npm isntall generator-h5bp -g
```

## scaffolding
```
mkdir travis-test
cd travis-test
yo h5bp
npm init
```

* add .gitignore http://gitignore.io
* add README also

## add file
``` javascript
// js/todos.js
(function(window, ns) {
    var todo = {
        get: function() {
            return "todo";
        }
    };
    window[ns] = todo;
})(window, "todo");
```

``` javascript
// js/main.js
console.log(todo.get());
```

## csslint
```
npm install csslint -save-dev
```

``` javascript
// package.json
"scripts": {
  ..
  "csslint": "node node_modules/csslint/cli css",
  ..
}
```

```
npm run csslint
```

## jshint
```
npm install jshint -g
touch .jshintignore
```

```
//.jshintignore
js/vendor/
```

```
// package.json
"scripts": {
  ..
  "jshint": "node node_modules/jshint/bin/jshint js",
  ..
}
```

```
npm run jshint
```

## unit test
```
npm install mocha chai --save-dev
```

```javascript
// test/todo.test.js
describe("todo", function() {
	it("should 'todo'", function() {
		expect(todo.get()).to.be.equal("todo");
	});
});
```

``` html
<!-- test/index.html -->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>todo test</title>
    <link href="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.css" rel="stylesheet" />
</head>
<body>
    <div id="mocha"></div>
    <script src="https://cdn.rawgit.com/jquery/jquery/2.1.4/dist/jquery.min.js"></script>
    <script src="https://cdn.rawgit.com/Automattic/expect.js/0.3.1/index.js"></script>
    <script src="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js"></script>
    <script src="../js/todos.js"></script>

    <script>mocha.setup("bdd")</script>
    <script src="todo.test.js"></script>
    <script>
        mocha.checkLeaks();
        mocha.run();
    </script>
</body>
</html>
```


## karma
```
npm install phantomjs-prebuilt --save dev
npm install karma karma-cli karma-mocha karma-chai karma-phantomjs-launcher --save-dev
```

```javascript
// karma.conf.js
module.exports = function(config) {
	config.set({
		frameworks: ["mocha", "chai"],
		files: ["js/todos.js", "test/todo.test.js"],
		browsers: ["PhantomJS"],
		singleRun: true
	});
};
```

```
// package.json
"scripts": {
  ..
  "karma": "node ./node_modules/karma-cli/bin/karma start"
  ..
}
```

## grunt
```
npm install grunt grunt-cli --save-dev
npm install grunt-contrib-csslint grunt-contrib-jshint grunt-karma --save-dev
```

```javascript
// Gruntfile.js
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		csslint: {
			default: {
				src: ["css/**/*.css"]
			}
		},
		jshint: {
			default: {
				src: ['js/**/*.js', "!js/vendor/**/*"]
			}
		},
		karma: {
			default: {
				configFile: "karma.conf.js"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-karma");

	grunt.registerTask("default", ["csslint", "jshint", "karma"]);
};
```

```
// package.json
"scripts": {
  ..
  "test": "node node_modules/grunt-cli/bin/grunt"
  ..
}
```

## .travis.yml
```
language: node_js
node_js:
  - "5.1"
  - "4.2"
  - "0.12"
```