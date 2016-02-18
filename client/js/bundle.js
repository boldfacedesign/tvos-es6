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

babelHelpers;

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

        this.BASEURL = baseURL;
    }
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
                presentation = ele.getAttribute("presentation"),
                resourceLoader = new ResourceLoader(this.BASEURL);;

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
		console.log(options);
		this.parser = new DOMParser();
		this.presenter = new Presenter$1(options.BASEURL);
	}

	babelHelpers.createClass(base_view, [{
		key: "makeDoc",
		value: function makeDoc(xml) {
			return this.parser.parseFromString(xml, "application/xml");
			// return this.presenter.makeDocument(xml)
		}
	}, {
		key: "defaultPresent",
		value: function defaultPresent(doc) {
			this.presenter.defaultPresenter(doc);
		}
	}]);
	return base_view;
}();

function template$2() {
	return "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<document>\n\t<stackTemplate>\n\t\t<banner>\n\t\t\t<title>Stack Template</title>\n\t\t</banner>\n\t\t<collectionList>\n\t\t\t<shelf>\n\t\t\t\t<section>\n\t\t\t\t\t<lockup>\n\t\t\t\t\t\t<img src=\"https://upload.wikimedia.org/wikipedia/en/archive/d/d5/20160130060108!Iron_Man_3_theatrical_poster.jpg\" width=\"182\" height=\"274\" />\n\t\t\t\t\t\t<title>Movie 1</title>\n\t\t\t\t\t</lockup>\n\t\t\t\t</section>\n\t\t\t</shelf>\n\t\t</collectionList>\n\t</stackTemplate>\n</document>";
}

var home_view = function (_base_view) {
	babelHelpers.inherits(home_view, _base_view);

	function home_view(options) {
		babelHelpers.classCallCheck(this, home_view);

		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(home_view).call(this, options));

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
			this.el = babelHelpers.get(Object.getPrototypeOf(home_view.prototype), "makeDoc", this).call(this, template$2());
			return this;
		}
	}]);
	return home_view;
}(base_view);

function template$3(json) {
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
			this.doc = this.makeDocument(template$3(json));
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

var router = function () {
	function router(options) {
		babelHelpers.classCallCheck(this, router);

		if (!options.baseurl) {
			throw "router: baseurl is required.";
		}

		this.BASEURL = options.baseurl;
		this.menuBar = options.menu_bar;
		this.presenter = new Presenter$1(options.baseurl);
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
			}
		}
	}, {
		key: "home",
		value: function home() {
			var homeView = new home_view(this.BASEURL);
			console.log(new XMLSerializer().serializeToString(homeView.el));
			console.log(new XMLSerializer().serializeToString(this.menuBar.el.getElementById("home_link")));
			this.presenter.menuBarItemPresenter(homeView.el, this.menuBar.el.getElementById("home_link"));
		}
	}, {
		key: "descriptiveAlert",
		value: function descriptiveAlert() {
			var descriptiveAlertView$$ = new descriptiveAlertView({ test: "123" });
		}
	}]);
	return router;
}();

function template() {
  return "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<document>\n  <menuBarTemplate>\n    <menuBar>\n      <menuItem href=\"#home\" id=\"home_link\" loadingtext=\"Home\">\n        <title>Home</title>\n      </menuItem>\n      <menuItem href=\"#shop\" id=\"shop_link\" loadingtext=\"Shop\">\n        <title>Shop</title>\n      </menuItem>\n    </menuBar>\n  </menuBarTemplate>\n</document>";
}

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

function template$1() {
	return "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<document>\n\t<loadingTemplate>\n\t\t<activityIndicator>\n\t\t\t<text>Loading</text>\n\t\t</activityIndicator>\n\t</loadingTemplate>\n</document>";
}

var loading_modal = function (_base_view) {
	babelHelpers.inherits(loading_modal, _base_view);

	function loading_modal(options) {
		babelHelpers.classCallCheck(this, loading_modal);

		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(loading_modal).call(this, options));

		_this.initialize();
		return _this;
	}

	babelHelpers.createClass(loading_modal, [{
		key: "initialize",
		value: function initialize() {
			this.render();
		}
	}, {
		key: "render",
		value: function render() {
			this.el = babelHelpers.get(Object.getPrototypeOf(loading_modal.prototype), "makeDoc", this).call(this, template$1());
			return this;
		}
	}]);
	return loading_modal;
}(base_view);

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

    /**
     * evaluateScripts is responsible for loading the JavaScript files neccessary
     * for you app to run. It can be used at any time in your apps lifecycle.
     * 
     * @param - Array of JavaScript URLs  
     * @param - Function called when the scripts have been evaluated. A boolean is
     * passed that indicates if the scripts were evaluated successfully.
     */
    // evaluateScripts(javascriptFiles, success => {
    //     if (success) {
    // resourceLoader = new ResourceLoader(options.BASEURL);
    var presenter = new Presenter$1(options.BASEURL);

    // let loadingScreen = new LoadingScreen(options.BASEURL);
    // presenter.defaultPresenter(loadingScreen.el);

    presenter.showLoadingIndicator();

    var menuBar = new menu_bar(options.BASEURL);
    presenter.defaultPresenter(menuBar.el);

    var router$$ = new router({ baseurl: options.BASEURL, menu_bar: menuBar });

    router$$.navigate("#home");

    // let index = resourceLoader.loadResource(`${options.BASEURL}templates/Index.xml.js`,
    //     resource => {
    //         let doc = presenter.makeDocument(resource);
    //         // doc.addEventListener("select", presenter.load.bind(presenter));
    //         doc.addEventListener("select", event => {
    //             let ele = event.target,
    //                 viewURL = ele.getAttribute("href");
    //             console.log(viewURL);
    //             router.navigate(viewURL);
    //         });
    //         navigationDocument.pushDocument(doc);
    //     });
    // } else {
    /*
    Be sure to handle error cases in your code. You should present a readable, and friendly
    error message to the user in an alert dialog.
     See alertDialog.xml.js template for details.
    */
    // let alert = createAlert("Evaluate Scripts Error", "There was an error attempting to evaluate the external JavaScript files.\n\n Please check your network connection and try again later.");
    // navigationDocument.presentModal(alert);

    // throw ("Playback Example: unable to evaluate scripts.");
    //     }
    // });
};