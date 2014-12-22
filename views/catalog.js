var h = require('hyperscript');

module.exports = template;

function stationLi(station) {
  return h('li',
          h('a', {href: '/catalog/'+ station}, station));
}

function template(data) {
    return "<DOCTYPE html>" + h("html", [
        h("head", [
            h("title", "npr-streams - stations")
        ]),
        h("body", [
            h("h1", "Stations"),
            h('ul',
            data.map(stationLi))
        ])
    ]).outerHTML;
}
