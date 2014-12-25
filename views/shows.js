var h = require('hyperscript');

module.exports = template;

function showLi(show) {
  return h('li',
           h('a', {href: show.url}, show.title));
}

function template(data) {
  return "<DOCTYPE html>" + h("html", [
    h("head", [
      h("meta", {"charset":"utf-8"}),
      h("title", "npr-streams - shows for "+data.station)
    ]),
    h("body", [
      h("h1", "Shows for "+data.station),
      h('ul',
        data.shows.map(showLi))
    ])
  ]).outerHTML;
}
