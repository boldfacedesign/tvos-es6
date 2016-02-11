/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A search template lets users search your content and view found results. It includes a search field, a keyboard, and a list of results.
*/
var Template = function() {
  return `<?xml version="1.0" encoding="UTF-8" ?>
  <document>
    <head>
      <style>
        .suggestionListLayout {
          margin: -150 0;
        }
      </style>
    </head>
    <searchTemplate>
      <searchField>Search</searchField>
      <collectionList>
        <shelf>
          <header>
            <title>Results</title>
          </header>
          <section>
            <lockup>
              <img src="${this.BASEURL}resources/images/movies/movie_1.lcr" width="350" height="520" />
              <title>The Puffin</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/movies/movie_2.lcr" width="350" height="520" />
              <title>Lola and Max</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/movies/movie_3.lcr" width="350" height="520" />
              <title>Road to Firenze</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/movies/movie_4.lcr" width="350" height="520" />
              <title>Three Developers and a Baby</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/movies/movie_5.lcr" width="350" height="520" />
              <title>Santa Cruz Surf</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/movies/movie_6.lcr" width="350" height="520" />
              <title>Cinque Terre</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/movies/movie_7.lcr" width="350" height="520" />
              <title>Creatures of the Rainforest</title>
            </lockup>
          </section>
        </shelf>
      </collectionList>
    </searchTemplate>
  </document>`
}
