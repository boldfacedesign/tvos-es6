/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A list template shows a list of items on the right, such as movies or TV shows. Focus on one to see its related content on the left, such as its artwork or description.

This variation of the list templates uses a banner element to display a large image at the top of the page.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <listTemplate>
    <banner>
      <background>
        <img src="${this.BASEURL}resources/images/italy/italy_10_wide.jpg" width="1920" height="360" />
      </background>
    </banner>
    <list>
      <header>
        <title>Title</title>
      </header>
      <relatedContent>
        <lockup>
          <img src="${this.BASEURL}resources/images/italy/italy_5.jpg" width="857" height="482" />
          <title>Common Related Title</title>
          <subtitle>Common Related Subtitle</subtitle>
          <description>Lorem ipsum Sociis mauris in integer, a dolor netus non dui aliquet, sagittis felis sodales, dolor sociis mauris, vel eu libero cras. Interdum at. Eget habitasse elementum est, ipsum purus pede porttitor class, ut adipiscing, aliquet sed auctor, imperdiet arcu per diam dapibus libero duis. Enim eros in vel, volutpat.</description>
        </lockup>
      </relatedContent>
      <section>
        <header>
          <title>Section Title</title>
        </header>
        <listItemLockup>
          <title>Title 1</title>
          <relatedContent>
            <lockup>
              <img src="${this.BASEURL}resources/images/italy/italy_1.jpg" width="857" height="482" />
              <title>Related Title 1</title>
              <subtitle>Related Subtitle 1</subtitle>
              <description>Lorem ipsum Sociis mauris in integer, a dolor netus non dui aliquet, sagittis felis sodales, dolor sociis mauris, vel eu libero cras. Interdum at. Eget habitasse elementum est, ipsum purus pede porttitor class, ut adipiscing, aliquet sed auctor, imperdiet arcu per diam dapibus libero duis. Enim eros in vel, volutpat.</description>
            </lockup>
          </relatedContent>
        </listItemLockup>
        <listItemLockup>
          <title>Title 2</title>
          <relatedContent>
            <lockup>
              <img src="${this.BASEURL}resources/images/italy/italy_2.jpg" width="857" height="482" />
              <title>Related Title 2</title>
              <subtitle>Related Subtitle 2</subtitle>
              <description>Lorem ipsum Sociis mauris in integer, a dolor netus non dui aliquet, sagittis felis sodales, dolor sociis mauris, vel eu libero cras. Interdum at. Eget habitasse elementum est, ipsum purus pede porttitor class, ut adipiscing, aliquet sed auctor, imperdiet arcu per diam dapibus libero duis. Enim eros in vel, volutpat.</description>
            </lockup>
          </relatedContent>
        </listItemLockup>
        <listItemLockup>
          <title>Title 3</title>
          <relatedContent>
            <lockup>
              <img src="${this.BASEURL}resources/images/italy/italy_3.jpg" width="857" height="482" />
              <title>Related Title 3</title>
              <subtitle>Related Subtitle 3</subtitle>
              <description>Lorem ipsum Sociis mauris in integer, a dolor netus non dui aliquet, sagittis felis sodales, dolor sociis mauris, vel eu libero cras. Interdum at. Eget habitasse elementum est, ipsum purus pede porttitor class, ut adipiscing, aliquet sed auctor, imperdiet arcu per diam dapibus libero duis. Enim eros in vel, volutpat.</description>
            </lockup>
          </relatedContent>
        </listItemLockup>
        <listItemLockup>
          <title>Title 4</title>
          <relatedContent>
            <lockup>
              <img src="${this.BASEURL}resources/images/italy/italy_4.jpg" width="857" height="482" />
              <title>Related Title 4</title>
              <subtitle>Related Subtitle 4</subtitle>
              <description>Lorem ipsum Sociis mauris in integer, a dolor netus non dui aliquet, sagittis felis sodales, dolor sociis mauris, vel eu libero cras. Interdum at. Eget habitasse elementum est, ipsum purus pede porttitor class, ut adipiscing, aliquet sed auctor, imperdiet arcu per diam dapibus libero duis. Enim eros in vel, volutpat.</description>
            </lockup>
          </relatedContent>
        </listItemLockup>
        <listItemLockup>
          <title>Title 5</title>
        </listItemLockup>
        <listItemLockup>
          <title>Title 6</title>
        </listItemLockup>
        <listItemLockup>
          <title>Title 7</title>
        </listItemLockup>
        <listItemLockup>
          <title>Title 8</title>
        </listItemLockup>
      </section>
    </list>
  </listTemplate>
</document>`
}
