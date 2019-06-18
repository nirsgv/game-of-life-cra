import {shallow} from "enzyme/build/index";
import Cell from "../components/cell";
import React from "react";

class testUtils {
    /**
     * Return shallowWrapper node(s) with given data-test value.
     * @param {shallowWrapper} wrapper
     * @param {string} val - value of data-test attribute to search for
     * @returns {node}
     */
    findByDataTestAttr = (wrapper, val) => {
        return wrapper.find(`[data-test="${val}"]`);
    };
}

export default new testUtils();
