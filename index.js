const TaskKitTask = require('taskkit-task');
const UglifyJS = require('uglify-js');
const async = require('async');
const fs = require('fs');
const path = require('path');

class UglifyTask extends TaskKitTask {
  get defaultOptions() {
    return {
      uglify: {}
    };
  }

  process(input, output, options, done) {
    if (!Array.isArray(input)) {
      input = [input];
    }
    async.map(input, (file, next) => {
      fs.readFile(file, 'utf8', next);
    }, (err, files) => {
      if (err) {
        return done(err);
      }

      const code = {};
      input.forEach((f, i) => {
        code[f] = files[i];
      });
      if (typeof options.uglify.sourceMap === 'undefined') {
        options.uglify.sourceMap = {
          filename: output,
          url: `${path.basename(output)}.map`
        };
      }
      const results = UglifyJS.minify(code, Object.assign({}, options.uglify));
      const out = {
        [output]: results.code,
        [`${output}.map`]: results.map
      };
      this.writeMany(out, done);
    });
  }
}

module.exports = UglifyTask;
