import { tmplString } from "../../shared/util.js"

let tmpl = json => tmplString`<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
    .showTextOnHighlight {
      tv-text-highlight-style: show-on-highlight;
    }
    .whiteBadge {
      tv-tint-color: rgb(255, 255, 255);
    }
    .shelfLayout {
      padding: 20 90 50;
    }
    </style>
  </head>
  <productTemplate theme="light">
    <background>
    </background>
    <banner>
      <heroImg src="${json.Poster}" />
      <infoList>
        <info>
          <header>
            <title>Director</title>
          </header>
          <text>${json.Director}</text>
        </info>
        <info>
          <header>
            <title>Actors</title>
          </header>
          ${json.Actors.map(actor => tmplString`<text>${actor}</text>`)}
        </info>
      </infoList>
      <stack>
        <title>${json.Title}</title>
        <row>
          <text>${json.Year}   |</text>
          <text>${json.Runtime}   |</text>
          <img src="${json.Badge}" width="45" height="45" /><text>|   </text>
          <text>User rating: ${json.imdbRating}</text>
        </row>
        <description allowsZooming="true" presentation="modalDialogPresenter">${json.Plot}</description>
        <row>
          <buttonLockup id="play_trailer">
            <badge src="resource://button-preview" class="whiteBadge" />
            <title>Trailer</title>
          </buttonLockup>
          <buttonLockup id="play_main_asset">
            <badge src="resource://button-play" class="whiteBadge" />
            <title>Watch</title>
          </buttonLockup>
        </row>
      </stack>
    </banner>
    <shelf>
      <header>
        <title>You may also like</title>
      </header>
      <section>
        ${json.Alternatives.map(item => tmplString`<lockup href="#details/${item.imdbID}">
            <img src="${item.Poster}" width="243" height="365" />
            <title>$${item.Title}</title>
          </lockup>`)}
      </section>
    </shelf>
  </productTemplate>
</document>`

export default tmpl;

