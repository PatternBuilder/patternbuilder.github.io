const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const nunjucks = require('nunjucks');
const watch = require('metalsmith-watch');
const sass = require('metalsmith-sass');
const serve = require('metalsmith-serve');
const navigation = require('metalsmith-navigation');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');

metalsmith = Metalsmith(__dirname)
  .clean(false)
  .use(markdown())
  .use(collections({
    docs: {
      pattern: 'docs/*.html',
      sortBy: 'title'
    }
  }))
  .use(permalinks({
    pattern: ':title',
    linksets: [{
          match: { collection: 'docs' },
          pattern: 'docs/:title'
      }
    ]
  }))
  .use(layouts({
    engine: 'nunjucks',
    default: 'page.html',
    pattern: "**/*.html"
  }))
  .build(function(err){
    if (err) throw err;
  });
