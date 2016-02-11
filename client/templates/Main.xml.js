/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A main template displays a full-screen image with a menu along the bottom. It’s commonly used for the home screen of a movie, with menu options for playing the movie and accessing chapters or extras.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <mainTemplate>
    <background>
      <img src="${this.BASEURL}resources/images/italy/italy_1.jpg" />
      <img src="${this.BASEURL}resources/images/italy/italy_2.jpg" />
      <img src="${this.BASEURL}resources/images/italy/italy_3.jpg" />
      <img src="${this.BASEURL}resources/images/italy/italy_4.jpg" />
      <audio>
        <asset id="main_audio" src="${this.BASEURL}resources/audio/Building_Blocks.mp3" keyDelivery="itunes" />
      </audio>
    </background>
    <menuBar>
      <section>
        <menuItem>
          <title>Tab 1</title>
        </menuItem>
        <menuItem>
          <title>Tab 2</title>
        </menuItem>
        <menuItem>
          <title>Tab 3</title>
        </menuItem>
      </section>
    </menuBar>
  </mainTemplate>
</document>`
}