import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Cell from '../components/Cell';
import testUtils from './testUtils';

Enzyme.configure({adapter: new EnzymeAdapter()});

const initialState = {
    cellInfo: {
        cellActive: true,
        celllHighlight: false
    }
};

const setup = (props = {}, state = null) => {
    return shallow(<Cell {...props} />)
};

it('cell something', () => {
    const wrapper = setup(initialState);
    const appContainer = testUtils.findByDataTestAttr(wrapper, "cell");
    expect(appContainer.length).toBe(1);
});
