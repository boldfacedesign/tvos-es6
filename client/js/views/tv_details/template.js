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
  <productBundleTemplate theme="light">
    <background>
    </background>
    <banner>
      <heroImg src="${'http://image.tmdb.org/t/p/w500' + json.backdrop_path}" />
      <stack>
        <title>${json.name}</title>
        <row>
          <text>English   |</text>
          ${json.genres.map(genre => tmplString`<text>${genre.name},</text>`)}
        </row>
        <row>
          <text>Created By:</text>
        </row>
        <row>
          ${json.created_by.map(person => tmplString`<text>${person.name}, </text>`)}
        </row>
        <description allowsZooming="true" presentation="modalDialogPresenter">${json.overview}</description>
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
        <title>More Seasons</title>
      </header>
      <section>
        ${json.seasons.map(season => tmplString`<lockup>
          <img src="${'http://image.tmdb.org/t/p/w500' + season.poster_path}" width="300" height="450" />
          <title>${'Season ' + season.season_number}</title>
          </lockup>`)}
      </section>
    </shelf>
  </productBundleTemplate>
</document>`

export default tmpl;

