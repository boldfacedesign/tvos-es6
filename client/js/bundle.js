var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers.taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

babelHelpers;

var config = function () {
	function config() {
		babelHelpers.classCallCheck(this, config);

		this.base_url = null;
	}

	babelHelpers.createClass(config, [{
		key: "baseURL",
		get: function get() {
			return this.base_url;
		},
		set: function set(url) {
			this.base_url = url;
		}
	}]);
	return config;
}();

var app_config = new config();

/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
This class handles the loading of resources from the network using the evaluateScripts 
function. 

TVMLKit also provides a complet XMLHttpRequest object that can be used to request 
resources from the network.
*/
/**
 * @description This function sets the class BASEURL attribute
 * @param {String} baseurl - The base URL for the app
 * @throws Exception - If no baseurl argument is provided
 */

var ResourceLoader = function () {
    function ResourceLoader(baseurl) {
        babelHelpers.classCallCheck(this, ResourceLoader);

        if (!baseurl) {
            throw "ResourceLoader: baseurl is required.";
        }

        this.BASEURL = baseurl;
    }

    babelHelpers.createClass(ResourceLoader, [{
        key: "loadResource",
        value: function loadResource(resource, callback) {
            var self = this;

            evaluateScripts([resource], function (success) {
                if (success) {
                    var _resource = Template.call(self);
                    callback.call(self, _resource);
                } else {
                    var title = "Resource Loader Error",
                        description = "There was an error attempting to load the resource '" + resource + "'. \n\n Please try again later.",
                        alert = createAlert(title, description);

                    Presenter.removeLoadingIndicator();

                    navigationDocument.presentModal(alert);
                }
            });
        }
    }]);
    return ResourceLoader;
}();

var Presenter$1 = function () {
    function Presenter(baseURL) {
        babelHelpers.classCallCheck(this, Presenter);
    }
    // this.BASEURL = baseURL

    /**
     * @description This function demonstrate the default way of present a document. 
     * The document can be presented on screen by adding to to the documents array
     * of the navigationDocument. The navigationDocument allows you to manipulate
     * the documents array with the pushDocument, popDocument, replaceDocument, and
     * removeDocument functions. 
     *
     * You can replace an existing document in the navigationDocumetn array by calling 
     * the replaceDocument function of navigationDocument. replaceDocument requires two
     * arguments: the new document, the old document.
     * @param {Document} xml - The XML document to push on the stack
     */


    babelHelpers.createClass(Presenter, [{
        key: "defaultPresenter",
        value: function defaultPresenter(xml) {

            /*
            If a loading indicator is visible, we replace it with our document, otherwise 
            we push the document on the stack
            */
            if (this.loadingIndicatorVisible) {
                navigationDocument.replaceDocument(xml, this.loadingIndicator);
                this.loadingIndicatorVisible = false;
            } else {
                navigationDocument.pushDocument(xml);
            }
        }

        /**
         * @description Extends the default presenter functionality and registers
         * the onTextChange handler to allow for a search implementation
         * @param {Document} xml - The XML document to push on the stack
         */

    }, {
        key: "searchPresenter",
        value: function searchPresenter(xml) {

            this.defaultPresenter.call(this, xml);
            var doc = xml;

            var searchField = doc.getElementsByTagName("searchField").item(0);
            var keyboard = searchField.getFeature("Keyboard");

            keyboard.onTextChange = function () {
                var searchText = keyboard.text;
                console.log('search text changed: ' + searchText);
                buildResults(doc, searchText);
            };
        }

        /**
         * @description This function demonstrates the presentation of documents as modals.
         * You can present and manage a document in a modal view by using the pushModal() and
         * removeModal() functions. Only a single document may be presented as a modal at
         * any given time. Documents presented in the modal view are presented in fullscreen
         * with a semi-transparent background that blurs the document below it.
         *
         * @param {Document} xml - The XML document to present as modal
         */

    }, {
        key: "modalDialogPresenter",
        value: function modalDialogPresenter(xml) {
            navigationDocument.presentModal(xml);
        }

        /**
         * @description This function demonstrates how to present documents within a menu bar.
         * Each item in the menu bar can have a single document associated with it. To associate
         * document to you an item you use the MenuBarDocument feature.
         *
         * Menu bar elements have a MenuBarDocument feature that stores the document associated
         * with a menu bar element. In JavaScript you access the MenuBarDocument by invoking the 
         * getFeature function on the menuBar element. 
         *
         * A feature in TVMLKit is a construct for attaching extended capabilities to an
         * element. See the TVMLKit documentation for information on elements with available
         * features.
         *
         * @param {Document} xml - The XML document to associate with a menu bar element
         * @param {Element} ele - The currently selected item element
         */

    }, {
        key: "menuBarItemPresenter",
        value: function menuBarItemPresenter(xml, ele) {
            /*
            To get the menu bar's 'MenuBarDocument' feature, we move up the DOM Node tree using
            the parentNode property. This allows us to access the the menuBar element from the 
            current item element.
            */
            var feature = ele.parentNode.getFeature("MenuBarDocument");

            console.log(feature);

            if (feature) {
                /*
                To retrieve the document associated with the menu bar element, if one has been 
                set, you call the getDocument function the MenuBarDocument feature. The function
                takes one argument, the item element.
                */
                var currentDoc = feature.getDocument(ele);
                /*
                To present a document within the menu bar, you need to associate it with the 
                menu bar item. This is accomplished by call the setDocument function on MenuBarDocument
                feature. The function takes two argument, the document to be presented and item it 
                should be associated with.
                 In this implementation we are only associating a document once per menu bar item. You can 
                associate a document each time the item is selected, or you can associate documents with 
                all the menu bar items before the menu bar is presented. You will need to experimet here
                to balance document presentation times with updating the document items.
                */
                if (!currentDoc) {
                    feature.setDocument(xml, ele);
                }
            }
        }

        /**
         * @description This function handles the select event and invokes the appropriate presentation method.
         * This is only one way to implent a system for presenting documents. You should determine
         * the best system for your application and data model.
         *
         * @param {Event} event - The select event
         */

    }, {
        key: "load",
        value: function load(event) {
            console.log(event);

            var self = this,
                ele = event.target,
                templateURL = ele.getAttribute("template"),
                presentation = ele.getAttribute("presentation");
            // resourceLoader = new ResourceLoader(this.BASEURL);;

            /*
            Check if the selected element has a 'template' attribute. If it does then we begin
            the process to present the template to the user.
            */
            if (templateURL) {
                /*
                Whenever a user action is taken you need to visually indicate to the user that
                you are processing their action. When a users action indicates that a new document
                should be presented you should first present a loadingIndicator. This will provide
                the user feedback if the app is taking a long time loading the data or the next 
                document.
                */
                self.showLoadingIndicator(presentation);

                /* 
                Here we are retrieving the template listed in the templateURL property.
                */
                resourceLoader.loadResource(templateURL, function (resource) {
                    if (resource) {
                        /*
                        The XML template must be turned into a DOMDocument in order to be 
                        presented to the user. See the implementation of makeDocument below.
                        */
                        var doc = self.makeDocument(resource);

                        /*
                        Event listeners are used to handle and process user actions or events. Listeners
                        can be added to the document or to each element. Events are bubbled up through the
                        DOM heirarchy and can be handled or cancelled at at any point.
                         Listeners can be added before or after the document has been presented.
                         For a complete list of available events, see the TVMLKit DOM Documentation.
                        */
                        doc.addEventListener("select", self.load.bind(self));
                        doc.addEventListener("highlight", self.load.bind(self));

                        /*
                        This is a convenience implementation for choosing the appropriate method to 
                        present the document. 
                        */
                        if (self[presentation] instanceof Function) {
                            self[presentation].call(self, doc, ele);
                        } else {
                            self.defaultPresenter.call(self, doc);
                        }
                    }
                });
            }
        }

        /**
         * @description This function creates a XML document from the contents of a template file.
         * In this example we are utilizing the DOMParser to transform the Index template from a 
         * string representation into a DOMDocument.
         *
         * @param {String} resource - The contents of the template file
         * @return {Document} - XML Document
         */

    }, {
        key: "makeDocument",
        value: function makeDocument(resource) {
            if (!Presenter.parser) {
                Presenter.parser = new DOMParser();
            }

            var doc = Presenter.parser.parseFromString(resource, "application/xml");
            return doc;
        }

        /**
         * @description This function handles the display of loading indicators.
         *
         * @param {String} presentation - The presentation function name
         */

    }, {
        key: "showLoadingIndicator",
        value: function showLoadingIndicator(presentation) {
            console.log("presenter show loading");
            /*
            You can reuse documents that have previously been created. In this implementation
            we check to see if a loadingIndicator document has already been created. If it 
            hasn't then we create one.
            */
            if (!this.loadingIndicator) {
                this.loadingIndicator = this.makeDocument(this.loadingTemplate());
            }

            /* 
            Only show the indicator if one isn't already visible and we aren't presenting a modal.
            */
            if (!this.loadingIndicatorVisible && presentation != "modalDialogPresenter" && presentation != "menuBarItemPresenter") {
                navigationDocument.pushDocument(this.loadingIndicator);
                this.loadingIndicatorVisible = true;
            }
        }

        /**
         * @description This function handles the removal of loading indicators.
         * If a loading indicator is visible, it removes it from the stack and sets the loadingIndicatorVisible attribute to false.
         */

    }, {
        key: "removeLoadingIndicator",
        value: function removeLoadingIndicator() {
            if (this.loadingIndicatorVisible) {
                navigationDocument.removeDocument(this.loadingIndicator);
                this.loadingIndicatorVisible = false;
            }
        }

        /**
         * @description Instead of a loading a template from the server, it can stored in a property 
         * or variable for convenience. This is generally employed for templates that can be reused and
         * aren't going to change often, like a loadingIndicator.
         */

    }, {
        key: "loadingTemplate",
        value: function loadingTemplate() {
            return "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n        <document>\n          <loadingTemplate>\n            <activityIndicator>\n              <text>Loading</text>\n            </activityIndicator>\n          </loadingTemplate>\n        </document>";
        }
    }]);
    return Presenter;
}();

var base_view = function () {
	function base_view(options) {
		babelHelpers.classCallCheck(this, base_view);

		this.options = options;
		this.parser = new DOMParser();
		this.presenter = new Presenter$1();
	}

	babelHelpers.createClass(base_view, [{
		key: "makeDoc",
		value: function makeDoc(xml) {
			var doc = this.parser.parseFromString(xml, "application/xml");
			doc.addEventListener("select", this.onSelect.bind(this));
			return doc;
			// return this.presenter.makeDocument(xml)
		}
	}, {
		key: "onSelect",
		value: function onSelect(e) {
			if (e.target.getAttribute("href")) {
				router.navigate(e.target.getAttribute("href"));
			} else {
				this.select();
			}
		}
	}]);
	return base_view;
}();

function template() {
  return "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<document>\n  <menuBarTemplate>\n    <menuBar>\n      <menuItem href=\"#home\" id=\"home\" loadingtext=\"Home\">\n        <title>Movies</title>\n      </menuItem>\n      <menuItem href=\"#shop\" id=\"shop\" loadingtext=\"Shop\">\n        <title>Shop</title>\n      </menuItem>\n    </menuBar>\n  </menuBarTemplate>\n</document>";
}

var presenter = new Presenter$1();

var menu_bar = function (_base_view) {
	babelHelpers.inherits(menu_bar, _base_view);

	function menu_bar(options) {
		babelHelpers.classCallCheck(this, menu_bar);

		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(menu_bar).call(this, options));

		_this.initialize();
		return _this;
	}

	babelHelpers.createClass(menu_bar, [{
		key: "initialize",
		value: function initialize() {
			this.render();
		}
	}, {
		key: "render",
		value: function render() {
			this.el = babelHelpers.get(Object.getPrototypeOf(menu_bar.prototype), "makeDoc", this).call(this, template());

			if (presenter.loading_indicator && navigationDocument.documents.indexOf(presenter.loading_indicator) != -1) {
				console.log("menu bar replace");
				navigationDocument.replaceDocument(this.el, presenter.loading_indicator);
			} else {
				console.log("menu bar push");
				navigationDocument.pushDocument(this.el);
			}

			return this;
		}
	}, {
		key: "onSelect",
		value: function onSelect(event) {
			console.log("menu_bar select");
		}
	}]);
	return menu_bar;
}(base_view);

function htmlEscape(str) {
    return str.replace(/&/g, '&amp;') // first!
    .replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/`/g, '&#96;');
}

function tmplString(literalSections) {
    // Use raw literal sections: we don’t want
    // backslashes (\n etc.) to be interpreted
    var raw = literalSections.raw;

    var result = '';

    for (var _len = arguments.length, substs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        substs[_key - 1] = arguments[_key];
    }

    substs.forEach(function (subst, i) {
        // Retrieve the literal section preceding
        // the current substitution
        var lit = raw[i];

        // In the example, map() returns an array:
        // If substitution is an array (and not a string),
        // we turn it into a string
        if (Array.isArray(subst)) {
            subst = subst.join('');
        }

        // If the substitution is preceded by a dollar sign,
        // we escape special characters in it
        if (lit.endsWith('$')) {
            subst = htmlEscape(subst);
            lit = lit.slice(0, -1);
        }
        result += lit;
        result += subst;
    });
    // Take care of last literal section
    // (Never fails, because an empty template string
    // produces one literal section, an empty string)
    result += raw[raw.length - 1]; // (A)

    return result;
}

var _templateObject = babelHelpers.taggedTemplateLiteral(["<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<document>\n\t<head>\n\t\t<style>\n\t\t\t.shelf {\n\t\t\t\ttv-interitem-spacing: 60;\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<stackTemplate>\n\t\t<collectionList>\n\t\t\t<shelf>\n\t\t\t\t<header>\n\t\t\t\t\t<title>Schwarzenegger</title>\n\t\t\t\t</header>\n\t\t\t\t<section>\n\t\t\t\t\t", "\n\t\t\t\t</section>\n\t\t\t</shelf>\n\t\t\t<shelf>\n\t\t\t\t<header>\n\t\t\t\t\t<title>Cage</title>\n\t\t\t\t</header>\n\t\t\t\t<section>\n\t\t\t\t\t", "\n\t\t\t\t</section>\n\t\t\t</shelf>\n\t\t</collectionList>\n\t</stackTemplate>\n</document>"], ["<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<document>\n\t<head>\n\t\t<style>\n\t\t\t.shelf {\n\t\t\t\ttv-interitem-spacing: 60;\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<stackTemplate>\n\t\t<collectionList>\n\t\t\t<shelf>\n\t\t\t\t<header>\n\t\t\t\t\t<title>Schwarzenegger</title>\n\t\t\t\t</header>\n\t\t\t\t<section>\n\t\t\t\t\t", "\n\t\t\t\t</section>\n\t\t\t</shelf>\n\t\t\t<shelf>\n\t\t\t\t<header>\n\t\t\t\t\t<title>Cage</title>\n\t\t\t\t</header>\n\t\t\t\t<section>\n\t\t\t\t\t", "\n\t\t\t\t</section>\n\t\t\t</shelf>\n\t\t</collectionList>\n\t</stackTemplate>\n</document>"]);
var _templateObject2 = babelHelpers.taggedTemplateLiteral(["<lockup href=\"#details\">\n\t\t\t\t\t\t<img src=\"", "\" width=\"300\" height=\"450\" />\n\t\t\t\t\t\t<title>$", "</title>\n\t\t\t\t\t</lockup>"], ["<lockup href=\"#details\">\n\t\t\t\t\t\t<img src=\"", "\" width=\"300\" height=\"450\" />\n\t\t\t\t\t\t<title>$", "</title>\n\t\t\t\t\t</lockup>"]);
var tmpl = function tmpl(json) {
	return tmplString(_templateObject, json.arnie.map(function (item) {
		return tmplString(_templateObject2, item.Poster, item.Title);
	}), json.cage.map(function (item) {
		return tmplString(_templateObject2, item.Poster, item.Title);
	}));
};

var movies$1 = movies = {
	arnie: [{
		"Title": "The Terminator",
		"Year": "1984",
		"Rated": "R",
		"Released": "26 Oct 1984",
		"Runtime": "107 min",
		"Genre": "Action, Sci-Fi",
		"Director": "James Cameron",
		"Writer": "James Cameron, Gale Anne Hurd, William Wisher Jr. (additional dialogue)",
		"Actors": "Arnold Schwarzenegger, Michael Biehn, Linda Hamilton, Paul Winfield",
		"Plot": "A cyborg is sent from the future on a deadly mission. He has to kill Sarah Connor, a young woman whose life will have a great significance in years to come. Sarah has only one protector - Kyle Reese - also sent from the future. The Terminator uses his exceptional intelligence and strength to find Sarah, but is there any way to stop the seemingly indestructible cyborg ?",
		"Language": "English, Spanish",
		"Country": "UK, USA",
		"Awards": "5 wins & 6 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BODE1MDczNTUxOV5BMl5BanBnXkFtZTcwMTA0NDQyNA@@._V1_SX300.jpg",
		"Metascore": "83",
		"imdbRating": "8.1",
		"imdbVotes": "568,980",
		"imdbID": "tt0088247",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Terminator 2: Judgment Day",
		"Year": "1991",
		"Rated": "R",
		"Released": "03 Jul 1991",
		"Runtime": "137 min",
		"Genre": "Action, Sci-Fi",
		"Director": "James Cameron",
		"Writer": "James Cameron, William Wisher Jr.",
		"Actors": "Arnold Schwarzenegger, Linda Hamilton, Edward Furlong, Robert Patrick",
		"Plot": "Almost 10 years have passed since the first cyborg called The Terminator tried to kill Sarah Connor and her unborn son, John Connor. John Connor, the future leader of the human resistance, is now a healthy young boy. However another Terminator is sent back through time called the T-1000, which is more advanced and more powerful than its predecessor. The Mission: to kill John Connor when he's still a child. However, Sarah and John do not have to face this threat of a Terminator alone. Another Terminator is also sent back through time. The mission: to protect John and Sarah Connor at all costs. The battle for tomorrow has begun...",
		"Language": "English, Spanish",
		"Country": "USA, France",
		"Awards": "Won 4 Oscars. Another 20 wins & 22 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTI4MDAwMDY3N15BMl5BanBnXkFtZTcwODIwMzMzMQ@@._V1._CR46,1,342,473_SY132_CR3,0,89,132_AL_.jpg_V1_SX300.jpg",
		"Metascore": "75",
		"imdbRating": "8.5",
		"imdbVotes": "707,026",
		"imdbID": "tt0103064",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Terminator 3: Rise of the Machines",
		"Year": "2003",
		"Rated": "R",
		"Released": "02 Jul 2003",
		"Runtime": "109 min",
		"Genre": "Action, Sci-Fi",
		"Director": "Jonathan Mostow",
		"Writer": "James Cameron (characters), Gale Anne Hurd (characters), John D. Brancato (story), Michael Ferris (story), Tedi Sarafian (story), John D. Brancato (screenplay), Michael Ferris (screenplay)",
		"Actors": "Arnold Schwarzenegger, Nick Stahl, Claire Danes, Kristanna Loken",
		"Plot": "A cybernetic warrior from a post-apocalyptic future travels back in time to protect a 19-year old drifter and his future wife from a most advanced robotic assassin and to ensure they both survive a nuclear attack.",
		"Language": "English",
		"Country": "USA, Germany, UK",
		"Awards": "2 wins & 17 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTk5NzM1ODgyN15BMl5BanBnXkFtZTcwMzA5MjAzMw@@._V1_SX300.jpg",
		"Metascore": "66",
		"imdbRating": "6.4",
		"imdbVotes": "293,362",
		"imdbID": "tt0181852",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Terminator Genisys",
		"Year": "2015",
		"Rated": "PG-13",
		"Released": "01 Jul 2015",
		"Runtime": "126 min",
		"Genre": "Action, Adventure, Sci-Fi",
		"Director": "Alan Taylor",
		"Writer": "Laeta Kalogridis, Patrick Lussier, James Cameron (characters), Gale Anne Hurd (characters)",
		"Actors": "Arnold Schwarzenegger, Jason Clarke, Emilia Clarke, Jai Courtney",
		"Plot": "When John Connor, leader of the human resistance, sends Sgt. Kyle Reese back to 1984 to protect Sarah Connor and safeguard the future, an unexpected turn of events creates a fractured timeline.",
		"Language": "English",
		"Country": "USA",
		"Awards": "5 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMjM1NTc0NzE4OF5BMl5BanBnXkFtZTgwNDkyNjQ1NTE@._V1_SX300.jpg",
		"Metascore": "38",
		"imdbRating": "6.6",
		"imdbVotes": "165,960",
		"imdbID": "tt1340138",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Twins",
		"Year": "1988",
		"Rated": "PG",
		"Released": "09 Dec 1988",
		"Runtime": "107 min",
		"Genre": "Comedy",
		"Director": "Ivan Reitman",
		"Writer": "William Davies, William Osborne, Timothy Harris, Herschel Weingrod",
		"Actors": "Arnold Schwarzenegger, Danny DeVito, Kelly Preston, Chloe Webb",
		"Plot": "A physically perfect but innocent man goes in search of his long-lost twin brother, who is a short small-time crook.",
		"Language": "English",
		"Country": "USA",
		"Awards": "Nominated for 1 Golden Globe. Another 4 wins.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTgwNzYwNTQ0OF5BMl5BanBnXkFtZTcwMzk1ODcxMQ@@._V1_SX300.jpg",
		"Metascore": "53",
		"imdbRating": "6.0",
		"imdbVotes": "83,797",
		"imdbID": "tt0096320",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "The Running Man",
		"Year": "1987",
		"Rated": "R",
		"Released": "13 Nov 1987",
		"Runtime": "101 min",
		"Genre": "Action, Crime, Sci-Fi",
		"Director": "Paul Michael Glaser",
		"Writer": "Stephen King (novel), Steven E. de Souza (screenplay)",
		"Actors": "Arnold Schwarzenegger, Maria Conchita Alonso, Yaphet Kotto, Jim Brown",
		"Plot": "A wrongly convicted man must try to survive a public execution gauntlet staged as a game show.",
		"Language": "English",
		"Country": "USA",
		"Awards": "1 win & 3 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BNzM4OTcyMjEyNl5BMl5BanBnXkFtZTcwMzEwNDI4OA@@._V1_SX300.jpg",
		"Metascore": "N/A",
		"imdbRating": "6.6",
		"imdbVotes": "108,442",
		"imdbID": "tt0093894",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Predator",
		"Year": "1987",
		"Rated": "R",
		"Released": "12 Jun 1987",
		"Runtime": "107 min",
		"Genre": "Action, Horror, Sci-Fi",
		"Director": "John McTiernan",
		"Writer": "Jim Thomas, John Thomas",
		"Actors": "Arnold Schwarzenegger, Carl Weathers, Elpidia Carrillo, Bill Duke",
		"Plot": "A team of commandos on a mission in a Central American jungle find themselves hunted by an extra-terrestrial warrior.",
		"Language": "English, Spanish",
		"Country": "USA",
		"Awards": "Nominated for 1 Oscar. Another 3 wins & 4 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTI2ODMzODA0Ml5BMl5BanBnXkFtZTYwNTM3NzY5._V1._CR17,27,308,447_SY132_CR1,0,89,132_AL_.jpg_V1_SX300.jpg",
		"Metascore": "36",
		"imdbRating": "7.8",
		"imdbVotes": "279,237",
		"imdbID": "tt0093773",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Total Recall",
		"Year": "1990",
		"Rated": "R",
		"Released": "01 Jun 1990",
		"Runtime": "113 min",
		"Genre": "Action, Sci-Fi",
		"Director": "Paul Verhoeven",
		"Writer": "Philip K. Dick (short story \"We Can Remember It For You Wholesale\"), Ronald Shusett (screen story), Dan O'Bannon (screen story), Jon Povill (screen story), Ronald Shusett (screenplay), Dan O'Bannon (screenplay), Gary Goldman (screenplay)",
		"Actors": "Arnold Schwarzenegger, Rachel Ticotin, Sharon Stone, Ronny Cox",
		"Plot": "When a man goes for virtual vacation memories of the planet Mars, an unexpected and harrowing series of events forces him to go to the planet for real - or does he?",
		"Language": "English",
		"Country": "USA",
		"Awards": "Nominated for 2 Oscars. Another 7 wins & 13 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTc2MTU4ODI5MF5BMl5BanBnXkFtZTcwODI2MzAyOA@@._V1_SX300.jpg",
		"Metascore": "57",
		"imdbRating": "7.5",
		"imdbVotes": "231,796",
		"imdbID": "tt0100802",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Kindergarten Cop",
		"Year": "1990",
		"Rated": "PG-13",
		"Released": "21 Dec 1990",
		"Runtime": "111 min",
		"Genre": "Action, Comedy, Crime",
		"Director": "Ivan Reitman",
		"Writer": "Murray Salem (story), Murray Salem (screenplay), Herschel Weingrod (screenplay), Timothy Harris (screenplay)",
		"Actors": "Arnold Schwarzenegger, Penelope Ann Miller, Pamela Reed, Linda Hunt",
		"Plot": "A tough cop is given his most difficult assignment ever: to masquerade as a kindergarten teacher in order to find a drug dealer.",
		"Language": "English, Spanish",
		"Country": "USA",
		"Awards": "4 wins & 1 nomination.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMjMyMTIyOTc0N15BMl5BanBnXkFtZTgwODY1NTk4NjE@._V1_SX300.jpg",
		"Metascore": "61",
		"imdbRating": "6.0",
		"imdbVotes": "103,187",
		"imdbID": "tt0099938",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "End of Days",
		"Year": "1999",
		"Rated": "R",
		"Released": "24 Nov 1999",
		"Runtime": "121 min",
		"Genre": "Action, Fantasy, Horror",
		"Director": "Peter Hyams",
		"Writer": "Andrew W. Marlowe",
		"Actors": "Arnold Schwarzenegger, Gabriel Byrne, Robin Tunney, Kevin Pollak",
		"Plot": "At the end of the century, Satan visits New York in search of a bride. It's up to an ex-cop who now runs an elite security outfit to stop him.",
		"Language": "English, Latin",
		"Country": "USA",
		"Awards": "1 win & 6 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMjExNjM5MzMwM15BMl5BanBnXkFtZTYwNjc2Njk4._V1_SX300.jpg",
		"Metascore": "33",
		"imdbRating": "5.7",
		"imdbVotes": "87,038",
		"imdbID": "tt0146675",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Eraser",
		"Year": "1996",
		"Rated": "R",
		"Released": "21 Jun 1996",
		"Runtime": "115 min",
		"Genre": "Action, Drama, Mystery",
		"Director": "Chuck Russell",
		"Writer": "Tony Puryear (story), Walon Green (story), Michael S. Chernuchin (story), Tony Puryear (screenplay), Walon Green (screenplay)",
		"Actors": "Arnold Schwarzenegger, James Caan, Vanessa Williams, James Coburn",
		"Plot": "A Witness Protection specialist becomes suspicious of his co-workers when dealing with a case involving high-tech weapons.",
		"Language": "English",
		"Country": "USA",
		"Awards": "Nominated for 1 Oscar. Another 3 wins & 1 nomination.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BODkyOTE2MjY5OF5BMl5BanBnXkFtZTcwNzI1NjUxMQ@@._V1_SX300.jpg",
		"Metascore": "56",
		"imdbRating": "6.1",
		"imdbVotes": "81,326",
		"imdbID": "tt0116213",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Last Action Hero",
		"Year": "1993",
		"Rated": "PG-13",
		"Released": "18 Jun 1993",
		"Runtime": "130 min",
		"Genre": "Action, Adventure, Comedy",
		"Director": "John McTiernan",
		"Writer": "Zak Penn (story), Adam Leff (story), Shane Black (screenplay), David Arnott (screenplay)",
		"Actors": "Arnold Schwarzenegger, F. Murray Abraham, Art Carney, Charles Dance",
		"Plot": "With the help of a magic ticket, a young film fan is transported into the fictional world of his favorite action film character.",
		"Language": "English",
		"Country": "USA",
		"Awards": "1 win & 16 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BNDg4OTg5MTc0NV5BMl5BanBnXkFtZTcwOTUxMzgxMQ@@._V1_SX300.jpg",
		"Metascore": "44",
		"imdbRating": "6.2",
		"imdbVotes": "102,379",
		"imdbID": "tt0107362",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Pumping Iron",
		"Year": "1977",
		"Rated": "PG",
		"Released": "31 Mar 1978",
		"Runtime": "85 min",
		"Genre": "Documentary, Sport",
		"Director": "George Butler, Robert Fiore",
		"Writer": "Charles Gaines (book), George Butler (book), George Butler (conception)",
		"Actors": "Arnold Schwarzenegger, Lou Ferrigno, Matty Ferrigno, Victoria Ferrigno",
		"Plot": "From Gold's Gym in Venice Beach California to the showdown in Pretoria, amateur and professional bodybuilders prepare for the 1975 Mr. Olympia and Mr. Universe contests in this ...",
		"Language": "English",
		"Country": "USA",
		"Awards": "1 win.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTg2OTIwNTQ2OF5BMl5BanBnXkFtZTcwNTA4NDAwMQ@@._V1_SX300.jpg",
		"Metascore": "N/A",
		"imdbRating": "7.5",
		"imdbVotes": "14,759",
		"imdbID": "tt0076578",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Jingle All the Way",
		"Year": "1996",
		"Rated": "PG",
		"Released": "22 Nov 1996",
		"Runtime": "89 min",
		"Genre": "Comedy, Family",
		"Director": "Brian Levant",
		"Writer": "Randy Kornfield",
		"Actors": "Arnold Schwarzenegger, Sinbad, Phil Hartman, Rita Wilson",
		"Plot": "A father vows to get his son a Turbo Man action figure for Christmas, however, every store is sold out of them, and he must travel all over town and compete with everybody else in order to find one.",
		"Language": "English",
		"Country": "USA",
		"Awards": "2 wins & 1 nomination.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTE5OTYzMzc0MV5BMl5BanBnXkFtZTcwNjQ0NTI1MQ@@._V1_SX300.jpg",
		"Metascore": "N/A",
		"imdbRating": "5.4",
		"imdbVotes": "66,825",
		"imdbID": "tt0116705",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "The 6th Day",
		"Year": "2000",
		"Rated": "PG-13",
		"Released": "17 Nov 2000",
		"Runtime": "123 min",
		"Genre": "Action, Mystery, Sci-Fi",
		"Director": "Roger Spottiswoode",
		"Writer": "Cormac Wibberley, Marianne Wibberley",
		"Actors": "Arnold Schwarzenegger, Michael Rapaport, Tony Goldwyn, Michael Rooker",
		"Plot": "Futuristic action about a man who meets a clone of himself and stumbles into a grand conspiracy about clones taking over the world.",
		"Language": "English",
		"Country": "USA",
		"Awards": "8 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTk1OTU5OTU2MV5BMl5BanBnXkFtZTYwMjMxMDk2._V1_SX300.jpg",
		"Metascore": "49",
		"imdbRating": "5.9",
		"imdbVotes": "97,596",
		"imdbID": "tt0216216",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Commando",
		"Year": "1985",
		"Rated": "R",
		"Released": "04 Oct 1985",
		"Runtime": "90 min",
		"Genre": "Action, Adventure, Thriller",
		"Director": "Mark L. Lester",
		"Writer": "Jeph Loeb (story), Matthew Weisman (story), Steven E. de Souza (story), Steven E. de Souza (screenplay)",
		"Actors": "Arnold Schwarzenegger, Rae Dawn Chong, Dan Hedaya, Vernon Wells",
		"Plot": "A retired elite Black Ops Commando launches a one man war against a group of South American criminals who have kidnapped his daughter to blackmail him into starting a revolution and getting an exiled dictator back into power.",
		"Language": "English",
		"Country": "USA",
		"Awards": "2 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTcyNzY4NjA2MF5BMl5BanBnXkFtZTcwNTkzNjk0MQ@@._V1_SX300.jpg",
		"Metascore": "N/A",
		"imdbRating": "6.7",
		"imdbVotes": "106,628",
		"imdbID": "tt0088944",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Conan the Barbarian",
		"Year": "1982",
		"Rated": "R",
		"Released": "14 May 1982",
		"Runtime": "129 min",
		"Genre": "Adventure, Fantasy",
		"Director": "John Milius",
		"Writer": "Robert E. Howard (based on the character created by), John Milius, Oliver Stone",
		"Actors": "Arnold Schwarzenegger, James Earl Jones, Max von Sydow, Sandahl Bergman",
		"Plot": "A vengeful barbarian warrior sets off to avenge his tribe and his parents whom were slain by an evil sorcerer and his warriors when he was a boy.",
		"Language": "English",
		"Country": "USA",
		"Awards": "Won 1 Golden Globe. Another 1 win & 9 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTQwMDUyMTcyNF5BMl5BanBnXkFtZTgwMjk2NzQxMTE@._V1_SX300.jpg",
		"Metascore": "43",
		"imdbRating": "6.9",
		"imdbVotes": "109,780",
		"imdbID": "tt0082198",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Collateral Damage",
		"Year": "2002",
		"Rated": "R",
		"Released": "08 Feb 2002",
		"Runtime": "108 min",
		"Genre": "Action, Drama, Thriller",
		"Director": "Andrew Davis",
		"Writer": "Ronald Roose (story), David Griffiths (story), Peter Griffiths (story), David Griffiths (screenplay), Peter Griffiths (screenplay)",
		"Actors": "Arnold Schwarzenegger, Francesca Neri, Elias Koteas, Cliff Curtis",
		"Plot": "After his family is killed by a terrorist act, a firefighter goes in search of the one responsible.",
		"Language": "English, Spanish",
		"Country": "USA",
		"Awards": "N/A",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTM2MTQ3MTAxMV5BMl5BanBnXkFtZTcwNDYxOTQxMQ@@._V1_SX300.jpg",
		"Metascore": "33",
		"imdbRating": "5.5",
		"imdbVotes": "59,663",
		"imdbID": "tt0233469",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "True Lies",
		"Year": "1994",
		"Rated": "R",
		"Released": "15 Jul 1994",
		"Runtime": "141 min",
		"Genre": "Action, Comedy, Thriller",
		"Director": "James Cameron",
		"Writer": "Claude Zidi (screenplay), Simon Michaël (screenplay), Didier Kaminka (screenplay), James Cameron (screenplay)",
		"Actors": "Arnold Schwarzenegger, Jamie Lee Curtis, Tom Arnold, Bill Paxton",
		"Plot": "A fearless, globe-trotting, terrorist-battling secret agent has his life turned upside down when he discovers his wife might be having an affair with a used car salesman.",
		"Language": "English, French, Arabic, German",
		"Country": "USA",
		"Awards": "Nominated for 1 Oscar. Another 7 wins & 15 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTM4OTIzNjcxM15BMl5BanBnXkFtZTcwMjc2MzE2MQ@@._V1_SX300.jpg",
		"Metascore": "63",
		"imdbRating": "7.2",
		"imdbVotes": "184,039",
		"imdbID": "tt0111503",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Conan the Destroyer",
		"Year": "1984",
		"Rated": "PG",
		"Released": "29 Jun 1984",
		"Runtime": "103 min",
		"Genre": "Action, Adventure, Fantasy",
		"Director": "Richard Fleischer",
		"Writer": "Robert E. Howard (character), Roy Thomas (story), Gerry Conway (story), Stanley Mann (screenplay)",
		"Actors": "Arnold Schwarzenegger, Grace Jones, Wilt Chamberlain, Mako",
		"Plot": "Conan leads a ragtag group of adventurers on a quest for a princess.",
		"Language": "English",
		"Country": "USA",
		"Awards": "1 win & 3 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTM2NTEwODA3M15BMl5BanBnXkFtZTcwNTk2NjEzNA@@._V1_SX300.jpg",
		"Metascore": "N/A",
		"imdbRating": "5.8",
		"imdbVotes": "59,899",
		"imdbID": "tt0087078",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Red Sonja",
		"Year": "1985",
		"Rated": "PG-13",
		"Released": "03 Jul 1985",
		"Runtime": "89 min",
		"Genre": "Action, Adventure, Fantasy",
		"Director": "Richard Fleischer",
		"Writer": "Robert E. Howard (character), Clive Exton, George MacDonald Fraser",
		"Actors": "Brigitte Nielsen, Arnold Schwarzenegger, Sandahl Bergman, Paul L. Smith",
		"Plot": "A vengeful woman sets out to retrieve a magic orb from an evil queen whom she vows vengeance upon after the evil queen slain her family and her loyal warriors raped her.",
		"Language": "English",
		"Country": "Netherlands, USA",
		"Awards": "1 win & 2 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMjIzMDk2NTcxMV5BMl5BanBnXkFtZTcwMzUxMTM4NA@@._V1_SX300.jpg",
		"Metascore": "N/A",
		"imdbRating": "4.9",
		"imdbVotes": "29,122",
		"imdbID": "tt0089893",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Raw Deal",
		"Year": "1986",
		"Rated": "R",
		"Released": "06 Jun 1986",
		"Runtime": "106 min",
		"Genre": "Action, Crime, Thriller",
		"Director": "John Irvin",
		"Writer": "Luciano Vincenzoni (story), Sergio Donati (story), Gary DeVore (screenplay), Norman Wexler (screenplay)",
		"Actors": "Arnold Schwarzenegger, Kathryn Harrold, Sam Wanamaker, Paul Shenar",
		"Plot": "A former FBI agent turned small-town sheriff agrees to help the FBI chief infiltrate the Chicago mafia when the FBI chief's son is killed by them.",
		"Language": "English",
		"Country": "USA, Netherlands",
		"Awards": "N/A",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BNjYwNjY4MTQzN15BMl5BanBnXkFtZTcwOTM4OTQyMQ@@._V1_SX300.jpg",
		"Metascore": "N/A",
		"imdbRating": "5.5",
		"imdbVotes": "22,101",
		"imdbID": "tt0091828",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Red Heat",
		"Year": "1988",
		"Rated": "R",
		"Released": "17 Jun 1988",
		"Runtime": "104 min",
		"Genre": "Action, Comedy, Crime",
		"Director": "Walter Hill",
		"Writer": "Walter Hill (story), Harry Kleiner (screenplay), Walter Hill (screenplay), Troy Kennedy-Martin (screenplay)",
		"Actors": "Arnold Schwarzenegger, James Belushi, Peter Boyle, Ed O'Ross",
		"Plot": "A tough Russian policeman is forced to partner up with a cocky Chicago police detective when he is sent to Chicago to apprehend a Georgian drug lord who killed his partner and fled the country.",
		"Language": "English, Russian",
		"Country": "USA",
		"Awards": "N/A",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTIwMDg4OTY5MV5BMl5BanBnXkFtZTcwNTk0MTcyMQ@@._V1_SX300.jpg",
		"Metascore": "61",
		"imdbRating": "6.0",
		"imdbVotes": "47,938",
		"imdbID": "tt0095963",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Junior",
		"Year": "1994",
		"Rated": "PG-13",
		"Released": "23 Nov 1994",
		"Runtime": "109 min",
		"Genre": "Comedy, Romance, Sci-Fi",
		"Director": "Ivan Reitman",
		"Writer": "Kevin Wade, Chris Conrad",
		"Actors": "Arnold Schwarzenegger, Danny DeVito, Emma Thompson, Frank Langella",
		"Plot": "As part of a fertility research project, a male scientist agrees to carry a pregnancy in his own body.",
		"Language": "English",
		"Country": "USA",
		"Awards": "Nominated for 1 Oscar. Another 3 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTYwNjA3MTUxMl5BMl5BanBnXkFtZTcwMDk2MjAyMQ@@._V1_SX300.jpg",
		"Metascore": "N/A",
		"imdbRating": "4.5",
		"imdbVotes": "52,065",
		"imdbID": "tt0110216",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Batman & Robin",
		"Year": "1997",
		"Rated": "PG-13",
		"Released": "20 Jun 1997",
		"Runtime": "125 min",
		"Genre": "Action, Sci-Fi",
		"Director": "Joel Schumacher",
		"Writer": "Bob Kane (Batman characters), Akiva Goldsman",
		"Actors": "Arnold Schwarzenegger, George Clooney, Chris O'Donnell, Uma Thurman",
		"Plot": "Batman & Robin try to keep their relationship together even as they must stop Mr. Freeze and Poison Ivy from freezing Gotham City.",
		"Language": "English",
		"Country": "USA, UK",
		"Awards": "5 wins & 21 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMjE3NzcyNzM4MF5BMl5BanBnXkFtZTYwNDA3Mzk4._V1_SX300.jpg",
		"Metascore": "28",
		"imdbRating": "3.7",
		"imdbVotes": "182,318",
		"imdbID": "tt0118688",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Escape Plan",
		"Year": "2013",
		"Rated": "R",
		"Released": "18 Oct 2013",
		"Runtime": "115 min",
		"Genre": "Action, Mystery, Thriller",
		"Director": "Mikael Håfström",
		"Writer": "Miles Chapman (screenplay), Jason Keller (screenplay), Miles Chapman (story)",
		"Actors": "Sylvester Stallone, Arnold Schwarzenegger, Jim Caviezel, Faran Tahir",
		"Plot": "When a structural-security authority finds himself set up and incarcerated in the world's most secret and secure prison, he has to use his skills to escape with help from the inside.",
		"Language": "English, German, Arabic, Urdu",
		"Country": "USA",
		"Awards": "2 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTk3OTcxMTEyNl5BMl5BanBnXkFtZTcwMDQ4MjQ2OQ@@._V1_SX300.jpg",
		"Metascore": "49",
		"imdbRating": "6.7",
		"imdbVotes": "170,072",
		"imdbID": "tt1211956",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "The Last Stand",
		"Year": "2013",
		"Rated": "R",
		"Released": "18 Jan 2013",
		"Runtime": "107 min",
		"Genre": "Action, Crime, Thriller",
		"Director": "Jee-woon Kim",
		"Writer": "Andrew Knauer",
		"Actors": "Arron Shiver, Arnold Schwarzenegger, Titos Menchaca, Richard Dillard",
		"Plot": "The leader of a drug cartel busts out of a courthouse and speeds to the Mexican border, where the only thing in his path is a sheriff and his inexperienced staff.",
		"Language": "English",
		"Country": "USA",
		"Awards": "1 win & 2 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BODc4NjI0OTYwNl5BMl5BanBnXkFtZTcwOTYwODQ3OA@@._V1_SX300.jpg",
		"Metascore": "54",
		"imdbRating": "6.4",
		"imdbVotes": "111,302",
		"imdbID": "tt1549920",
		"Type": "movie",
		"Response": "True"
	}],
	cage: [{
		"Title": "Leaving Las Vegas",
		"Year": "1995",
		"Rated": "R",
		"Released": "09 Feb 1996",
		"Runtime": "111 min",
		"Genre": "Drama, Romance",
		"Director": "Mike Figgis",
		"Writer": "John O'Brien (novel), Mike Figgis (screenplay)",
		"Actors": "Nicolas Cage, Elisabeth Shue, Julian Sands, Richard Lewis",
		"Plot": "Ben Sanderson, an alcoholic Hollywood screenwriter who lost everything because of his drinking, arrives in Las Vegas to drink himself to death. There, he meets and forms an uneasy friendship and non-interference pact with prostitute Sera.",
		"Language": "English, Russian",
		"Country": "USA",
		"Awards": "Won 1 Oscar. Another 30 wins & 27 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BNDg3MDM5NTI0MF5BMl5BanBnXkFtZTcwNDY0NDk0NA@@._V1_SX300.jpg",
		"Metascore": "82",
		"imdbRating": "7.6",
		"imdbVotes": "91,034",
		"imdbID": "tt0113627",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Snake Eyes",
		"Year": "1998",
		"Rated": "R",
		"Released": "07 Aug 1998",
		"Runtime": "98 min",
		"Genre": "Crime, Drama, Mystery",
		"Director": "Brian De Palma",
		"Writer": "Brian De Palma (story), David Koepp (story), David Koepp (screenplay)",
		"Actors": "Nicolas Cage, Gary Sinise, John Heard, Carla Gugino",
		"Plot": "A shady police detective finds himself in the middle of a murder conspiracy at an important boxing match in an Atlantic City casino.",
		"Language": "English",
		"Country": "USA, Canada",
		"Awards": "1 win & 2 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BNzg3OTY1OTg0Ml5BMl5BanBnXkFtZTYwNDE2OTA5._V1_SX300.jpg",
		"Metascore": "52",
		"imdbRating": "5.9",
		"imdbVotes": "62,796",
		"imdbID": "tt0120832",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Con Air",
		"Year": "1997",
		"Rated": "R",
		"Released": "06 Jun 1997",
		"Runtime": "115 min",
		"Genre": "Action, Crime, Thriller",
		"Director": "Simon West",
		"Writer": "Scott Rosenberg",
		"Actors": "Colm Meaney, Mykelti Williamson, Nick Chinlund, Renoly Santiago",
		"Plot": "Newly paroled ex-con and former U.S. Ranger Cameron Poe finds himself trapped in a prisoner transport plane when the passengers seize control.",
		"Language": "English",
		"Country": "USA",
		"Awards": "Nominated for 2 Oscars. Another 7 wins & 9 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTU1NzY2NjIzNV5BMl5BanBnXkFtZTgwMzE2Mzk5MDE@._V1_SX300.jpg",
		"Metascore": "52",
		"imdbRating": "6.8",
		"imdbVotes": "217,815",
		"imdbID": "tt0118880",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Raising Arizona",
		"Year": "1987",
		"Rated": "PG-13",
		"Released": "17 Apr 1987",
		"Runtime": "94 min",
		"Genre": "Comedy, Crime, Drama",
		"Director": "Joel Coen, Ethan Coen",
		"Writer": "Ethan Coen, Joel Coen",
		"Actors": "Nicolas Cage, Holly Hunter, Trey Wilson, John Goodman",
		"Plot": "When a childless couple of an ex-con and an ex-cop decide to help themselves to one of another family's quintupelets, their lives get more complicated than they anticipated.",
		"Language": "English",
		"Country": "USA",
		"Awards": "4 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTg0NjYzOTUzNF5BMl5BanBnXkFtZTcwODkyMDMyMQ@@._V1_SX300.jpg",
		"Metascore": "55",
		"imdbRating": "7.4",
		"imdbVotes": "96,591",
		"imdbID": "tt0093822",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "The Rock",
		"Year": "1996",
		"Rated": "R",
		"Released": "07 Jun 1996",
		"Runtime": "136 min",
		"Genre": "Action, Adventure, Thriller",
		"Director": "Michael Bay",
		"Writer": "David Weisberg (story), Douglas Cook (story), David Weisberg (screenplay), Douglas Cook (screenplay), Mark Rosner (screenplay)",
		"Actors": "Sean Connery, Nicolas Cage, Ed Harris, John Spencer",
		"Plot": "A mild-mannered chemist and an ex-con must lead the counterstrike when a rogue group of military men, led by a renegade general, threaten a nerve gas attack from Alcatraz against San Francisco.",
		"Language": "English",
		"Country": "USA",
		"Awards": "Nominated for 1 Oscar. Another 8 wins & 8 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTM3MTczOTM1OF5BMl5BanBnXkFtZTYwMjc1NDA5._V1_SX300.jpg",
		"Metascore": "58",
		"imdbRating": "7.4",
		"imdbVotes": "251,381",
		"imdbID": "tt0117500",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Face/Off",
		"Year": "1997",
		"Rated": "R",
		"Released": "27 Jun 1997",
		"Runtime": "138 min",
		"Genre": "Action, Crime, Sci-Fi",
		"Director": "John Woo",
		"Writer": "Mike Werb, Michael Colleary",
		"Actors": "John Travolta, Nicolas Cage, Joan Allen, Alessandro Nivola",
		"Plot": "In order to foil an extortion plot, an FBI agent undergoes a face-transplant surgery and assumes the identity and physical appearance of a ruthless terrorist, but the plan turns from bad to worse when the same criminal impersonates the cop.",
		"Language": "English, Latin",
		"Country": "USA",
		"Awards": "Nominated for 1 Oscar. Another 11 wins & 21 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTU4MjA5NTc2NV5BMl5BanBnXkFtZTgwOTI2Mzk5MDE@._V1_SX300.jpg",
		"Metascore": "82",
		"imdbRating": "7.3",
		"imdbVotes": "274,725",
		"imdbID": "tt0119094",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "City of Angels",
		"Year": "1998",
		"Rated": "PG-13",
		"Released": "10 Apr 1998",
		"Runtime": "114 min",
		"Genre": "Drama, Fantasy, Romance",
		"Director": "Brad Silberling",
		"Writer": "Wim Wenders (screenplay), Peter Handke (screenplay), Richard Reitinger (screenplay), Dana Stevens (screenplay)",
		"Actors": "Nicolas Cage, Meg Ryan, Andre Braugher, Dennis Franz",
		"Plot": "Inspired by the modern classic, Wings of Desire, City involves an angel (Cage) who is spotted by a doctor in an operating room. Franz plays Cage's buddy who somehow knows a lot about angels.",
		"Language": "English",
		"Country": "Germany, USA",
		"Awards": "Nominated for 1 Golden Globe. Another 10 wins & 11 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTIxMzk4Nzg0Nl5BMl5BanBnXkFtZTcwNzMzMzEyMQ@@._V1_SX300.jpg",
		"Metascore": "54",
		"imdbRating": "6.7",
		"imdbVotes": "91,749",
		"imdbID": "tt0120632",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "8MM",
		"Year": "1999",
		"Rated": "R",
		"Released": "26 Feb 1999",
		"Runtime": "123 min",
		"Genre": "Crime, Drama, Mystery",
		"Director": "Joel Schumacher",
		"Writer": "Andrew Kevin Walker",
		"Actors": "Nicolas Cage, Joaquin Phoenix, James Gandolfini, Peter Stormare",
		"Plot": "A private investigator is hired to discover if a \"snuff film\" is authentic or not.",
		"Language": "English",
		"Country": "Germany, USA",
		"Awards": "2 wins & 1 nomination.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTIyMjE0MzEzOF5BMl5BanBnXkFtZTYwMTQ4MDg4._V1_SX300.jpg",
		"Metascore": "19",
		"imdbRating": "6.5",
		"imdbVotes": "102,335",
		"imdbID": "tt0134273",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Gone in Sixty Seconds",
		"Year": "2000",
		"Rated": "PG-13",
		"Released": "09 Jun 2000",
		"Runtime": "118 min",
		"Genre": "Action, Crime, Thriller",
		"Director": "Dominic Sena",
		"Writer": "H.B. Halicki, Scott Rosenberg (screenplay)",
		"Actors": "Nicolas Cage, Giovanni Ribisi, Angelina Jolie, T.J. Cross",
		"Plot": "A retired master car thief must come back to the industry and steal 50 cars with his crew in one night to save his brother's life.",
		"Language": "English",
		"Country": "USA",
		"Awards": "6 wins & 5 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTIwMzExNDEwN15BMl5BanBnXkFtZTYwODMxMzg2._V1_SX300.jpg",
		"Metascore": "35",
		"imdbRating": "6.5",
		"imdbVotes": "211,603",
		"imdbID": "tt0187078",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "The Family Man",
		"Year": "2000",
		"Rated": "PG-13",
		"Released": "22 Dec 2000",
		"Runtime": "125 min",
		"Genre": "Comedy, Drama, Fantasy",
		"Director": "Brett Ratner",
		"Writer": "David Diamond, David Weissman",
		"Actors": "Nicolas Cage, Téa Leoni, Don Cheadle, Jeremy Piven",
		"Plot": "A fast-lane investment broker, offered the opportunity to see how the other half lives, wakes up to find that his sports car and girlfriend have become a mini-van and wife.",
		"Language": "English, Italian",
		"Country": "USA",
		"Awards": "4 wins & 6 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTI2Mjc0MDYyOV5BMl5BanBnXkFtZTcwMzA5MDQyMQ@@._V1_SX300.jpg",
		"Metascore": "42",
		"imdbRating": "6.7",
		"imdbVotes": "84,216",
		"imdbID": "tt0218967",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Adaptation.",
		"Year": "2002",
		"Rated": "R",
		"Released": "14 Feb 2003",
		"Runtime": "114 min",
		"Genre": "Comedy, Drama",
		"Director": "Spike Jonze",
		"Writer": "Susan Orlean (book), Charlie Kaufman (screenplay), Donald Kaufman (screenplay)",
		"Actors": "Nicolas Cage, Tilda Swinton, Meryl Streep, Chris Cooper",
		"Plot": "A lovelorn screenwriter becomes desperate as he tries and fails to adapt The Orchid Thief by Susan Orlean for the screen.",
		"Language": "English, Latin",
		"Country": "USA",
		"Awards": "Won 1 Oscar. Another 57 wins & 92 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMjAxNjMwNDQwNF5BMl5BanBnXkFtZTYwNDIzNTc2._V1_SX300.jpg",
		"Metascore": "83",
		"imdbRating": "7.7",
		"imdbVotes": "138,549",
		"imdbID": "tt0268126",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "National Treasure",
		"Year": "2004",
		"Rated": "PG",
		"Released": "19 Nov 2004",
		"Runtime": "131 min",
		"Genre": "Action, Adventure, Mystery",
		"Director": "Jon Turteltaub",
		"Writer": "Jim Kouf (screenplay), Cormac Wibberley (screenplay), Marianne Wibberley (screenplay), Jim Kouf (story), Oren Aviv (story), Charles Segars (story)",
		"Actors": "Nicolas Cage, Diane Kruger, Justin Bartha, Sean Bean",
		"Plot": "A historian races to find the legendary Templar Treasure before a team of mercenaries.",
		"Language": "English, Spanish",
		"Country": "USA",
		"Awards": "1 win & 9 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTY3NTc4OTYxMF5BMl5BanBnXkFtZTcwMjk5NzUyMw@@._V1_SX300.jpg",
		"Metascore": "39",
		"imdbRating": "6.9",
		"imdbVotes": "247,267",
		"imdbID": "tt0368891",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Matchstick Men",
		"Year": "2003",
		"Rated": "PG-13",
		"Released": "12 Sep 2003",
		"Runtime": "116 min",
		"Genre": "Crime, Drama, Thriller",
		"Director": "Ridley Scott",
		"Writer": "Eric Garcia (book), Nicholas Griffin (screenplay), Ted Griffin (screenplay)",
		"Actors": "Nicolas Cage, Sam Rockwell, Alison Lohman, Bruce Altman",
		"Plot": "A phobic con artist and his protégé are on the verge of pulling off a lucrative swindle when the former's teenage daughter arrives unexpectedly.",
		"Language": "English",
		"Country": "USA",
		"Awards": "2 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMjA3NjMyNjIyMF5BMl5BanBnXkFtZTYwOTgzMDI3._V1_SX300.jpg",
		"Metascore": "61",
		"imdbRating": "7.3",
		"imdbVotes": "103,564",
		"imdbID": "tt0325805",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Lord of War",
		"Year": "2005",
		"Rated": "R",
		"Released": "16 Sep 2005",
		"Runtime": "122 min",
		"Genre": "Crime, Drama, Thriller",
		"Director": "Andrew Niccol",
		"Writer": "Andrew Niccol",
		"Actors": "Nicolas Cage, Bridget Moynahan, Jared Leto, Shake Tukhmanyan",
		"Plot": "An arms dealer confronts the morality of his work as he is being chased by an Interpol agent.",
		"Language": "English, Ukrainian, German, Spanish, Russian, French, Arabic, Turkish",
		"Country": "USA, Germany, France",
		"Awards": "2 wins & 2 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMjEzNDM2OTgzN15BMl5BanBnXkFtZTcwMzU3MTIzMQ@@._V1_SX300.jpg",
		"Metascore": "62",
		"imdbRating": "7.6",
		"imdbVotes": "241,657",
		"imdbID": "tt0399295",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "The Weather Man",
		"Year": "2005",
		"Rated": "R",
		"Released": "28 Oct 2005",
		"Runtime": "102 min",
		"Genre": "Comedy, Drama",
		"Director": "Gore Verbinski",
		"Writer": "Steve Conrad",
		"Actors": "Nicolas Cage, Michael Caine, Hope Davis, Gemmenne de la Peña",
		"Plot": "A Chicago weather man, separated from his wife and children, debates whether professional and personal success are mutually exclusive.",
		"Language": "English",
		"Country": "USA, Germany",
		"Awards": "N/A",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ4NzAxMTE3Ml5BMl5BanBnXkFtZTYwMDAwMjY3._V1_SX300.jpg",
		"Metascore": "61",
		"imdbRating": "6.6",
		"imdbVotes": "68,040",
		"imdbID": "tt0384680",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Next",
		"Year": "2007",
		"Rated": "PG-13",
		"Released": "27 Apr 2007",
		"Runtime": "96 min",
		"Genre": "Action, Sci-Fi, Thriller",
		"Director": "Lee Tamahori",
		"Writer": "Gary Goldman (screenplay), Jonathan Hensleigh (screenplay), Paul Bernbaum (screenplay), Gary Goldman (screen story), Philip K. Dick (novel)",
		"Actors": "Nicolas Cage, Julianne Moore, Jessica Biel, Thomas Kretschmann",
		"Plot": "A Las Vegas magician who can see into the future is pursued by FBI agents seeking to use his abilities to prevent a nuclear terrorist attack.",
		"Language": "English, French, German, Serbian",
		"Country": "USA",
		"Awards": "1 win & 3 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTg3MjgyNjE1Nl5BMl5BanBnXkFtZTcwNTY1NDU0MQ@@._V1_SX300.jpg",
		"Metascore": "42",
		"imdbRating": "6.2",
		"imdbVotes": "121,380",
		"imdbID": "tt0435705",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "National Treasure: Book of Secrets",
		"Year": "2007",
		"Rated": "PG",
		"Released": "21 Dec 2007",
		"Runtime": "124 min",
		"Genre": "Action, Adventure, Mystery",
		"Director": "Jon Turteltaub",
		"Writer": "Marianne Wibberley (screenplay), Cormac Wibberley (screenplay), Gregory Poirier (story), Marianne Wibberley (story), Cormac Wibberley (story), Ted Elliott (story), Terry Rossio (story), Jim Kouf (characters), Oren Aviv (characters), Charles Segars (characters)",
		"Actors": "Nicolas Cage, Justin Bartha, Diane Kruger, Jon Voight",
		"Plot": "Benjamin Gates must follow a clue left in John Wilkes Booth's diary to prove his ancestor's innocence in the assassination of Abraham Lincoln.",
		"Language": "English, French",
		"Country": "USA",
		"Awards": "5 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTU2NTM3NjU1N15BMl5BanBnXkFtZTcwODg1MDU1MQ@@._V1_SX300.jpg",
		"Metascore": "48",
		"imdbRating": "6.5",
		"imdbVotes": "176,599",
		"imdbID": "tt0465234",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Bangkok Dangerous",
		"Year": "2008",
		"Rated": "R",
		"Released": "05 Sep 2008",
		"Runtime": "99 min",
		"Genre": "Action, Crime, Thriller",
		"Director": "Danny Pang, Oxide Chun Pang",
		"Writer": "Jason Richman (screenplay), Oxide Chun Pang, Danny Pang",
		"Actors": "Nicolas Cage, Shahkrit Yamnarm, Charlie Yeung, Panward Hemmanee",
		"Plot": "A hitman who's in Bangkok to pull off a series of jobs violates his personal code when he falls for a local woman and bonds with his errand boy.",
		"Language": "English, Thai",
		"Country": "USA",
		"Awards": "1 nomination.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTk2NjU4MDYwNV5BMl5BanBnXkFtZTcwMDQ5ODg3MQ@@._V1_SX300.jpg",
		"Metascore": "24",
		"imdbRating": "5.4",
		"imdbVotes": "47,138",
		"imdbID": "tt0814022",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Knowing",
		"Year": "2009",
		"Rated": "PG-13",
		"Released": "20 Mar 2009",
		"Runtime": "121 min",
		"Genre": "Drama, Mystery, Sci-Fi",
		"Director": "Alex Proyas",
		"Writer": "Ryne Douglas Pearson (screenplay), Juliet Snowden (screenplay), Stiles White (screenplay), Ryne Douglas Pearson (story)",
		"Actors": "Nicolas Cage, Chandler Canterbury, Rose Byrne, Lara Robinson",
		"Plot": "M.I.T. professor John Koestler links a mysterious list of numbers from a time capsule to past and future disasters and sets out to prevent the ultimate catastrophe.",
		"Language": "English",
		"Country": "USA, UK, Australia",
		"Awards": "1 win & 5 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTMyMjgyMDIyM15BMl5BanBnXkFtZTcwNjg3MjAyMg@@._V1_SX300.jpg",
		"Metascore": "41",
		"imdbRating": "6.2",
		"imdbVotes": "181,586",
		"imdbID": "tt0448011",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Bad Lieutenant: Port of Call New Orleans",
		"Year": "2009",
		"Rated": "R",
		"Released": "11 Dec 2009",
		"Runtime": "122 min",
		"Genre": "Crime, Drama",
		"Director": "Werner Herzog",
		"Writer": "William M. Finkelstein (screenplay)",
		"Actors": "Nicolas Cage, Eva Mendes, Val Kilmer, Xzibit",
		"Plot": "Terence McDonagh is a drug- and gambling-addled detective in post-Katrina New Orleans investigating the killing of five Senegalese immigrants.",
		"Language": "English, Spanish",
		"Country": "USA",
		"Awards": "3 wins & 9 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTcyMzY0NTMzMF5BMl5BanBnXkFtZTcwMTc1MjY4Mg@@._V1_SX300.jpg",
		"Metascore": "69",
		"imdbRating": "6.7",
		"imdbVotes": "63,598",
		"imdbID": "tt1095217",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Kick-Ass",
		"Year": "2010",
		"Rated": "R",
		"Released": "16 Apr 2010",
		"Runtime": "117 min",
		"Genre": "Action, Comedy",
		"Director": "Matthew Vaughn",
		"Writer": "Jane Goldman (screenplay), Matthew Vaughn (screenplay), Mark Millar (comic book), John Romita Jr. (comic book)",
		"Actors": "Aaron Taylor-Johnson, Garrett M. Brown, Evan Peters, Deborah Twiss",
		"Plot": "Dave Lizewski is an unnoticed high school student and comic book fan who one day decides to become a super-hero, even though he has no powers, training or meaningful reason to do so.",
		"Language": "English",
		"Country": "UK, USA",
		"Awards": "16 wins & 60 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMTMzNzEzMDYxM15BMl5BanBnXkFtZTcwMTc0NTMxMw@@._V1_SX300.jpg",
		"Metascore": "66",
		"imdbRating": "7.7",
		"imdbVotes": "416,838",
		"imdbID": "tt1250777",
		"Type": "movie",
		"Response": "True"
	}, {
		"Title": "Joe",
		"Year": "2013",
		"Rated": "R",
		"Released": "11 Apr 2014",
		"Runtime": "117 min",
		"Genre": "Drama",
		"Director": "David Gordon Green",
		"Writer": "Gary Hawkins, Larry Brown (based on the novel by)",
		"Actors": "Nicolas Cage, Tye Sheridan, Gary Poulter, Ronnie Gene Blevins",
		"Plot": "An ex-con, who is the unlikeliest of role models, meets a 15-year-old boy and is faced with the choice of redemption or ruin.",
		"Language": "English",
		"Country": "USA",
		"Awards": "4 wins & 9 nominations.",
		"Poster": "http://ia.media-imdb.com/images/M/MV5BMjExMzk5MTM1Ml5BMl5BanBnXkFtZTgwNzAzODgxMTE@._V1_SX300.jpg",
		"Metascore": "74",
		"imdbRating": "6.9",
		"imdbVotes": "34,455",
		"imdbID": "tt2382396",
		"Type": "movie",
		"Response": "True"
	}]
};

var home_view = function (_base_view) {
	babelHelpers.inherits(home_view, _base_view);

	function home_view(options) {
		babelHelpers.classCallCheck(this, home_view);

		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(home_view).call(this, options));

		_this.model = movies$1;
		_this.initialize();
		return _this;
	}

	babelHelpers.createClass(home_view, [{
		key: "initialize",
		value: function initialize() {
			this.render();
		}
	}, {
		key: "render",
		value: function render() {
			console.log(this.model);
			this.el = babelHelpers.get(Object.getPrototypeOf(home_view.prototype), "makeDoc", this).call(this, tmpl(this.model));
			return this;
		}
	}, {
		key: "select",
		value: function select(e) {
			console.log(e.target);
		}
	}]);
	return home_view;
}(base_view);

var _this$1 = this;

var _templateObject$1 = babelHelpers.taggedTemplateLiteral(["<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<document>\n  <head>\n    <style>\n    .showTextOnHighlight {\n      tv-text-highlight-style: show-on-highlight;\n    }\n    .whiteBadge {\n      tv-tint-color: rgb(255, 255, 255);\n    }\n    .shelfLayout {\n      padding: 20 90 50;\n    }\n    </style>\n  </head>\n  <productTemplate theme=\"light\">\n    <background>\n    </background>\n    <banner>\n      <heroImg src=\"http://ia.media-imdb.com/images/M/MV5BNDg3MDM5NTI0MF5BMl5BanBnXkFtZTcwNDY0NDk0NA@@._V1_SX300.jpg\" />\n      <infoList>\n        <info>\n          <header>\n            <title>Header</title>\n          </header>\n          <text>Text 1</text>\n          <text>Text 2</text>\n          <text>Text 3</text>\n        </info>\n      </infoList>\n      <stack>\n        <title>Title</title>\n        <row>\n          <text>Text 1</text>\n          <text>Text 2</text>\n          <text>Text 3</text>\n        </row>\n        <description allowsZooming=\"true\" template=\"", "templates/AlertWithDescription.xml.js\" presentation=\"modalDialogPresenter\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</description>\n        <row>\n          <buttonLockup>\n            <badge src=\"resource://button-remove\" class=\"whiteBadge\" />\n            <title>Title 1</title>\n          </buttonLockup>\n          <buttonLockup>\n            <badge src=\"resource://button-add\" class=\"whiteBadge\" />\n            <title>Title 2</title>\n          </buttonLockup>\n          <buttonLockup>\n            <badge src=\"resource://button-cloud\" class=\"whiteBadge\" />\n            <title>Title 3</title>\n          </buttonLockup>\n        </row>\n      </stack>\n    </banner>\n    <shelf>\n      <header>\n        <title>Shelf Header</title>\n      </header>\n      <section>\n        <lockup>\n          <img src=\"http://ia.media-imdb.com/images/M/MV5BNDg3MDM5NTI0MF5BMl5BanBnXkFtZTcwNDY0NDk0NA@@._V1_SX300.jpg\" width=\"150\" height=\"226\" />\n          <title class=\"showTextOnHighlight\">Title 1</title>\n        </lockup>\n        <lockup>\n          <img src=\"http://ia.media-imdb.com/images/M/MV5BNDg3MDM5NTI0MF5BMl5BanBnXkFtZTcwNDY0NDk0NA@@._V1_SX300.jpg\" width=\"150\" height=\"226\" />\n          <title class=\"showTextOnHighlight\">Title 2</title>\n        </lockup>\n      </section>\n    </shelf>\n    <shelf>\n      <header>\n        <title>Title</title>\n      </header>\n      <section>\n        <reviewCard>\n          <badge src=\"resource://button-checkmark\" />\n          <title>Title 1</title>\n          <subtitle>Subtitle 1</subtitle>\n        </reviewCard>\n        <reviewCard>\n          <badge src=\"resource://button-artist\" />\n          <title>Title</title>\n          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>\n        </reviewCard>\n        <reviewCard>\n          <badge src=\"resource://button-follow\" />\n          <subtitle>Subtitle</subtitle>\n          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>\n        </reviewCard>\n      </section>\n    </shelf>\n    <shelf class=\"shelfLayout\">\n      <header>\n        <title>Title</title>\n      </header>\n      <section>\n        <monogramLockup>\n          <monogram firstName=\"Adam\" lastName=\"Gooseff\" />\n          <title>Adam Gooseff</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Ailish\" lastName=\"Kimber\" />\n          <title>Ailish Kimber</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Allen\" lastName=\"Buchinski\" />\n          <title>Allen Buchinski</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Dave\" lastName=\"Elfving\" />\n          <title>Dave Elfving</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Ethan\" lastName=\"Izzarelli\" />\n          <title>Ethan Izzarelli</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Euna\" lastName=\"Kwon\" />\n          <title>Euna Kwon</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Fritz\" lastName=\"Ogden\" />\n          <title>Fritz Ogden</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Gilbert\" lastName=\"Solano\" />\n          <title>Gilbert Solano</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Jamie\" lastName=\"Wong\" />\n          <title>Jamie Wong</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Joyce\" lastName=\"Sihn\" />\n          <title>Joyce Sihn</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Vivian\" lastName=\"Li\" />\n          <title>Vivian Li</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Paul\" lastName=\"Cashman\" />\n          <title>Paul Cashman</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Stephanie\" lastName=\"Vidal\" />\n          <title>Stephanie Vidal</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Yumi\" lastName=\"Asai\" />\n          <title>Yumi Asai</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Rachel\" lastName=\"Roth\" />\n          <title>Rachel Roth</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Mike\" lastName=\"Stern\" />\n          <title>Mike Stern</title>\n        </monogramLockup>\n      </section>\n    </shelf>\n  </productTemplate>\n</document>"], ["<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<document>\n  <head>\n    <style>\n    .showTextOnHighlight {\n      tv-text-highlight-style: show-on-highlight;\n    }\n    .whiteBadge {\n      tv-tint-color: rgb(255, 255, 255);\n    }\n    .shelfLayout {\n      padding: 20 90 50;\n    }\n    </style>\n  </head>\n  <productTemplate theme=\"light\">\n    <background>\n    </background>\n    <banner>\n      <heroImg src=\"http://ia.media-imdb.com/images/M/MV5BNDg3MDM5NTI0MF5BMl5BanBnXkFtZTcwNDY0NDk0NA@@._V1_SX300.jpg\" />\n      <infoList>\n        <info>\n          <header>\n            <title>Header</title>\n          </header>\n          <text>Text 1</text>\n          <text>Text 2</text>\n          <text>Text 3</text>\n        </info>\n      </infoList>\n      <stack>\n        <title>Title</title>\n        <row>\n          <text>Text 1</text>\n          <text>Text 2</text>\n          <text>Text 3</text>\n        </row>\n        <description allowsZooming=\"true\" template=\"", "templates/AlertWithDescription.xml.js\" presentation=\"modalDialogPresenter\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</description>\n        <row>\n          <buttonLockup>\n            <badge src=\"resource://button-remove\" class=\"whiteBadge\" />\n            <title>Title 1</title>\n          </buttonLockup>\n          <buttonLockup>\n            <badge src=\"resource://button-add\" class=\"whiteBadge\" />\n            <title>Title 2</title>\n          </buttonLockup>\n          <buttonLockup>\n            <badge src=\"resource://button-cloud\" class=\"whiteBadge\" />\n            <title>Title 3</title>\n          </buttonLockup>\n        </row>\n      </stack>\n    </banner>\n    <shelf>\n      <header>\n        <title>Shelf Header</title>\n      </header>\n      <section>\n        <lockup>\n          <img src=\"http://ia.media-imdb.com/images/M/MV5BNDg3MDM5NTI0MF5BMl5BanBnXkFtZTcwNDY0NDk0NA@@._V1_SX300.jpg\" width=\"150\" height=\"226\" />\n          <title class=\"showTextOnHighlight\">Title 1</title>\n        </lockup>\n        <lockup>\n          <img src=\"http://ia.media-imdb.com/images/M/MV5BNDg3MDM5NTI0MF5BMl5BanBnXkFtZTcwNDY0NDk0NA@@._V1_SX300.jpg\" width=\"150\" height=\"226\" />\n          <title class=\"showTextOnHighlight\">Title 2</title>\n        </lockup>\n      </section>\n    </shelf>\n    <shelf>\n      <header>\n        <title>Title</title>\n      </header>\n      <section>\n        <reviewCard>\n          <badge src=\"resource://button-checkmark\" />\n          <title>Title 1</title>\n          <subtitle>Subtitle 1</subtitle>\n        </reviewCard>\n        <reviewCard>\n          <badge src=\"resource://button-artist\" />\n          <title>Title</title>\n          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>\n        </reviewCard>\n        <reviewCard>\n          <badge src=\"resource://button-follow\" />\n          <subtitle>Subtitle</subtitle>\n          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>\n        </reviewCard>\n      </section>\n    </shelf>\n    <shelf class=\"shelfLayout\">\n      <header>\n        <title>Title</title>\n      </header>\n      <section>\n        <monogramLockup>\n          <monogram firstName=\"Adam\" lastName=\"Gooseff\" />\n          <title>Adam Gooseff</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Ailish\" lastName=\"Kimber\" />\n          <title>Ailish Kimber</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Allen\" lastName=\"Buchinski\" />\n          <title>Allen Buchinski</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Dave\" lastName=\"Elfving\" />\n          <title>Dave Elfving</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Ethan\" lastName=\"Izzarelli\" />\n          <title>Ethan Izzarelli</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Euna\" lastName=\"Kwon\" />\n          <title>Euna Kwon</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Fritz\" lastName=\"Ogden\" />\n          <title>Fritz Ogden</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Gilbert\" lastName=\"Solano\" />\n          <title>Gilbert Solano</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Jamie\" lastName=\"Wong\" />\n          <title>Jamie Wong</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Joyce\" lastName=\"Sihn\" />\n          <title>Joyce Sihn</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Vivian\" lastName=\"Li\" />\n          <title>Vivian Li</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Paul\" lastName=\"Cashman\" />\n          <title>Paul Cashman</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Stephanie\" lastName=\"Vidal\" />\n          <title>Stephanie Vidal</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Yumi\" lastName=\"Asai\" />\n          <title>Yumi Asai</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Rachel\" lastName=\"Roth\" />\n          <title>Rachel Roth</title>\n        </monogramLockup>\n        <monogramLockup>\n          <monogram firstName=\"Mike\" lastName=\"Stern\" />\n          <title>Mike Stern</title>\n        </monogramLockup>\n      </section>\n    </shelf>\n  </productTemplate>\n</document>"]);

var tmpl$1 = function tmpl(json) {
  return tmplString(_templateObject$1, _this$1.BASEURL);
};

var details_view = function (_base_view) {
	babelHelpers.inherits(details_view, _base_view);

	function details_view(options) {
		babelHelpers.classCallCheck(this, details_view);

		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(details_view).call(this, options));

		_this.model = movies$1;
		_this.initialize();
		return _this;
	}

	babelHelpers.createClass(details_view, [{
		key: "initialize",
		value: function initialize() {
			this.render();
		}
	}, {
		key: "render",
		value: function render() {
			console.log(this.model);
			this.el = babelHelpers.get(Object.getPrototypeOf(details_view.prototype), "makeDoc", this).call(this, tmpl$1(this.model));
			return this;
		}
	}, {
		key: "onSelect",
		value: function onSelect(e) {
			console.log("select");
		}
	}]);
	return details_view;
}(base_view);

function template$1(json) {
	return "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t<document>\n\t\t<alertTemplate>\n\t\t\t<title>" + json.test + "</title>\n\t\t\t<description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>\n\t\t\t<button videoURL=\"http://techslides.com/demos/sample-videos/small.mp4\">\n\t\t\t\t<text>Button 1</text>\n\t\t\t</button>\n\t\t\t<button videoURL=\"http://static.videezy.com/system/resources/previews/000/004/325/original/49.mp4\">\n\t\t\t\t<text>Button 2</text>\n\t\t\t</button>\n\t\t</alertTemplate>\n\t</document>";
}

var descriptiveAlertView = function () {
	function descriptiveAlertView(options) {
		babelHelpers.classCallCheck(this, descriptiveAlertView);

		this.options = options;
		this.initialize();
	}

	babelHelpers.createClass(descriptiveAlertView, [{
		key: "initialize",
		value: function initialize() {
			this.render();
		}
	}, {
		key: "render",
		value: function render() {
			var json = this.options;
			console.log(json);
			this.doc = this.makeDocument(template$1(json));
			this.doc.addEventListener("select", function (event) {
				var ele = event.target,
				    videoURL = ele.getAttribute("videoURL");

				if (videoURL) {
					var player = new Player();
					var playlist = new Playlist();
					var mediaItem = new MediaItem("video", videoURL);

					player.playlist = playlist;
					player.playlist.push(mediaItem);
					player.present();

					navigationDocument.dismissModal();
				}
			});

			navigationDocument.presentModal(this.doc);
		}
	}, {
		key: "makeDocument",
		value: function makeDocument(resource) {
			if (!this.parser) {
				this.parser = new DOMParser();
			}

			return this.parser.parseFromString(resource, "application/xml");
		}
	}]);
	return descriptiveAlertView;
}();

var router$1 = function () {
	function router() {
		babelHelpers.classCallCheck(this, router);

		this.menuBar = new menu_bar();
		this.presenter = new Presenter$1();
	}

	babelHelpers.createClass(router, [{
		key: "navigate",
		value: function navigate(url) {
			var self = this;
			url = url.replace(/#/, "");

			switch (url) {
				case "descriptiveAlert":
					self.descriptiveAlert();
					break;
				case "home":
					self.home();
					break;
				case "details":
					self.details();
					break;
			}
		}
	}, {
		key: "home",
		value: function home() {
			var homeView = new home_view();
			// console.log(new XMLSerializer().serializeToString(homeView.el));

			// let menu_home = this.menuBar.el.getElementById("home");
			// console.log(new XMLSerializer().serializeToString(menu_home));

			this.presenter.menuBarItemPresenter(homeView.el, this.menuBar.el.getElementById("home"));
		}
	}, {
		key: "details",
		value: function details() {
			var detailsView = new details_view();
			this.presenter.defaultPresenter(detailsView.el);
		}
	}, {
		key: "descriptiveAlert",
		value: function descriptiveAlert() {
			var descriptiveAlertView$$ = new descriptiveAlertView({ test: "123" });
		}
	}]);
	return router;
}();

var router = new router$1();

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
App.onLaunch = function (options) {
    // var javascriptFiles = [
    //     `${options.BASEURL}js/resource_loader.js`,
    //     `${options.BASEURL}js/prezenter.js`
    // ];
    // let router = new Router();
    app_config.baseURL = options.BASEURL;

    var presenter = new Presenter$1();
    // presenter.showLoadingIndicator();

    // let menuBar = new MenuBar();
    // if (presenter.loading_indicator && navigationDocument.documents.indexOf(presenter.loading_indicator) != -1) {
    //     navigationDocument.replaceDocument(menuBar.el, presenter.loading_indicator);
    // } else {
    //     navigationDocument.pushDocument(menuBar.el);
    // }
    router.navigate("#home");
    // presenter.defaultPresenter(menuBar.el);
};