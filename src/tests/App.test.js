import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import testUtils from './testUtils';
//import initialState from './mocks/initialState';

Enzyme.configure({adapter: new EnzymeAdapter()});

const initialState = {
    rows: 10,
    columns: 10
};

/**
 * Factory function to create a shalowWrapper for the App component.
 * @function setup
 * @param {object} props
 * @param {object} state
 * @returns {shalowWrapper}
 */
const setup = (props = {}, state = null) => {
  return shallow(<App {...initialState} />)
};

it('renders without crashing', () => {
  const wrapper = setup();
  const appContainer = testUtils.findByDataTestAttr(wrapper, "app-container");
  expect(appContainer.length).toBe(1);
});

it('initial state as defined', () => {
    const wrapper = setup();
    const initialStateRows = wrapper.state('rows');
    const initialStateColumns = wrapper.state('columns');
    expect(initialStateRows).toBe(10);
    expect(initialStateColumns).toBe(10);
});