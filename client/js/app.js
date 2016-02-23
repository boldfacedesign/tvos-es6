//# sourceURL=application.js


// import ResourceLoader from "./resource_loader.js"
import router from "./shared/shared_router.js"
import Presenter from "./presenter.js"
import app_config from "./shared/app_config.js"
import MenuBar from "./components/menu_bar/menu_bar.js"
/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
This is the entry point to the application and handles the initial loading of required JavaScript files.
*/

// let resourceLoader
// let presenter

/**
 * @description The onLaunch callback is invoked after the application JavaScript 
 * has been parsed into a JavaScript context. The handler is passed an object 
 * that contains options passed in for launch. These options are defined in the
 * swift or objective-c client code. Options can be used to communicate to
 * your JavaScript code that data and as well as state information, like if the 
 * the app is being launched in the background.
 *
 * The location attribute is automatically added to the object and represents 
 * the URL that was used to retrieve the application JavaScript.
 */
App.onLaunch = options => {
    // var javascriptFiles = [
    //     `${options.BASEURL}js/resource_loader.js`,
    //     `${options.BASEURL}js/prezenter.js`
    // ];
    // let router = new Router();
    app_config.baseURL = options.BASEURL;

    let presenter = new Presenter();
    // presenter.showLoadingIndicator();

    // let menuBar = new MenuBar();
    // if (presenter.loading_indicator && navigationDocument.documents.indexOf(presenter.loading_indicator) != -1) {
    //     navigationDocument.replaceDocument(menuBar.el, presenter.loading_indicator);
    // } else {
    //     navigationDocument.pushDocument(menuBar.el);
    // }
    router.navigate("#home");
    // presenter.defaultPresenter(menuBar.el);
}


/**
 * This convenience funnction returns an alert template, which can be used to present errors to the user.
 */
const createAlert = (title, description) => {

    let alertString = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
          <alertTemplate>
            <title>${title}</title>
            <description>${description}</description>
          </alertTemplate>
        </document>`

    let parser = new DOMParser();

    let alertDoc = parser.parseFromString(alertString, "application/xml");

    return alertDoc
}

/**
 * @description - an example implementation of search that reacts to the 
 * keyboard onTextChange (see presenter.js) to filter the lockup items based on the search text
 * @param {Document} doc - active xml document 
 * @param {String} searchText - current text value of keyboard search input
 */
const buildResults = (doc, searchText) => {

    //simple filter and helper function
    let regExp = new RegExp(searchText, "i");
    let matchesText = value => {
        return regExp.test(value);
    }

    //sample data for search example
    let movies = {
        "The Puffin": 1,
        "Lola and Max": 2,
        "Road to Firenze": 3,
        "Three Developers and a Baby": 4,
        "Santa Cruz Surf": 5,
        "Cinque Terre": 6,
        "Creatures of the Rainforest": 7
    };
    let titles = Object.keys(movies);

    //Create parser and new input element
    let domImplementation = doc.implementation;
    let lsParser = domImplementation.createLSParser(1, null);
    let lsInput = domImplementation.createLSInput();

    //set default template fragment to display no results
    lsInput.stringData = `<list>
      <section>
        <header>
          <title>No Results</title>
        </header>
      </section>
    </list>`;

    //Apply filter to titles array using matchesText helper function
    titles = (searchText) ? titles.filter(matchesText) : titles;

    //overwrite stringData for new input element if search results exist by dynamically constructing shelf template fragment
    if (titles.length > 0) {
        lsInput.stringData = `<shelf><header><title>Results</title></header><section id="Results">`;
        for (var i = 0; i < titles.length; i++) {
            lsInput.stringData += `<lockup>
          <img src="${this.resourceLoader.BASEURL}resources/images/movies/movie_${movies[titles[i]]}.lcr" width="350" height="520" />
          <title>${titles[i]}</title>
        </lockup>`;
        }
        lsInput.stringData += `</section></shelf>`;
    }

    //add the new input element to the document by providing the newly created input, the context, 
    //and the operator integer flag (1 to append as child, 2 to overwrite existing children)
    lsParser.parseWithContext(lsInput, doc.getElementsByTagName("collectionList").item(0), 2);
}
