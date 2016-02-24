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
          <text>Text 1</text>
          <text>Text 2</text>
          <text>Text 3</text>
        </row>
        <description allowsZooming="true" presentation="modalDialogPresenter">${json.Plot}</description>
        <row>
          <buttonLockup id="play_trailer">
            <badge src="resource://button-play" class="whiteBadge" />
            <title>Trailer</title>
          </buttonLockup>
        </row>
      </stack>
    </banner>
    <shelf>
      <header>
        <title>Shelf Header</title>
      </header>
      <section>
        <lockup>
          <img src="http://ia.media-imdb.com/images/M/MV5BNDg3MDM5NTI0MF5BMl5BanBnXkFtZTcwNDY0NDk0NA@@._V1_SX300.jpg" width="150" height="226" />
          <title class="showTextOnHighlight">Title 1</title>
        </lockup>
        <lockup>
          <img src="http://ia.media-imdb.com/images/M/MV5BNDg3MDM5NTI0MF5BMl5BanBnXkFtZTcwNDY0NDk0NA@@._V1_SX300.jpg" width="150" height="226" />
          <title class="showTextOnHighlight">Title 2</title>
        </lockup>
      </section>
    </shelf>
    <shelf>
      <header>
        <title>Title</title>
      </header>
      <section>
        <reviewCard>
          <badge src="resource://button-checkmark" />
          <title>Title 1</title>
          <subtitle>Subtitle 1</subtitle>
        </reviewCard>
        <reviewCard>
          <badge src="resource://button-artist" />
          <title>Title</title>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
        </reviewCard>
        <reviewCard>
          <badge src="resource://button-follow" />
          <subtitle>Subtitle</subtitle>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
        </reviewCard>
      </section>
    </shelf>
    <shelf class="shelfLayout">
      <header>
        <title>Title</title>
      </header>
      <section>
        <monogramLockup>
          <monogram firstName="Adam" lastName="Gooseff" />
          <title>Adam Gooseff</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Ailish" lastName="Kimber" />
          <title>Ailish Kimber</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Allen" lastName="Buchinski" />
          <title>Allen Buchinski</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Dave" lastName="Elfving" />
          <title>Dave Elfving</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Ethan" lastName="Izzarelli" />
          <title>Ethan Izzarelli</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Euna" lastName="Kwon" />
          <title>Euna Kwon</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Fritz" lastName="Ogden" />
          <title>Fritz Ogden</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Gilbert" lastName="Solano" />
          <title>Gilbert Solano</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Jamie" lastName="Wong" />
          <title>Jamie Wong</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Joyce" lastName="Sihn" />
          <title>Joyce Sihn</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Vivian" lastName="Li" />
          <title>Vivian Li</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Paul" lastName="Cashman" />
          <title>Paul Cashman</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Stephanie" lastName="Vidal" />
          <title>Stephanie Vidal</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Yumi" lastName="Asai" />
          <title>Yumi Asai</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Rachel" lastName="Roth" />
          <title>Rachel Roth</title>
        </monogramLockup>
        <monogramLockup>
          <monogram firstName="Mike" lastName="Stern" />
          <title>Mike Stern</title>
        </monogramLockup>
      </section>
    </shelf>
  </productTemplate>
</document>`

export default tmpl;

