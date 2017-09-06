const UglifyTask = require('../');

const uglify = new UglifyTask('uglify', {
  files: {
    'test/out/a.js': [
      'test/in/a.js',
      'test/in/b.js'
    ],
    'test/out/b.js': 'test/in/b.js'
  }
});

uglify.execute(err => {
  if (err) {
    throw err;
  }
});
