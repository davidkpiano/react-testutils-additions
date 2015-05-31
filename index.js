"use strict";
var ReactTestUtils = require("react/addons").addons.TestUtils;

var RTE = ReactTestUtils;

RTE.find = function(root, selector){
	var segments = selector.split(" ");

	var lastFound = null;
	for (var i = 0; i < segments.length; i++) {

		lastFound = find(root, segments[i]);
		
		if(lastFound && lastFound.length){
			root = lastFound[0]; // just pick the first one, very naive for now...
		}
		else if(lastFound){
			root = lastFound;
		}
	}

	return lastFound;
};

function find(root, selector){
	
	if(selector.indexOf(".") === 0){ // class selector
		var className = selector.substring(1, selector.length); // remove the .
		return ReactTestUtils.scryRenderedDOMComponentsWithClass(root, className);
	}
	else if(selector.indexOf("#") === 0 ){ // Id selector
		var id = selector.substring(1, selector.length); // remove the #
		return ReactTestUtils.findRenderedDOMComponentWithId(root, id);
	}
	else if(selector.length){ // tag selector
		return ReactTestUtils.scryRenderedDOMComponentsWithTag(root, selector);
	}
}

RTE.scryRenderedDOMComponentsWithAttributeValue = function(root, propName, propValue) {
    return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        return ReactTestUtils.isDOMComponent(inst) &&
                inst.props.hasOwnProperty(propName) &&
                inst.props[propName] === propValue;});
};

RTE.findRenderedDOMComponentWithId = function(root, propValue) {
    var all = this.scryRenderedDOMComponentsWithAttributeValue(root, "id", propValue);
    if (all.length !== 1) {
        throw new Error('Did not find exactly one match for id:' + propValue);
    }
    return all[0];
};

if (typeof module === "object" && typeof module.exports === "object" ) {	
	module.exports = RTE;
} 
window.ReactTestUtilsExtended = RTE;