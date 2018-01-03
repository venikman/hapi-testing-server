import test from 'ava';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../lib/app/js/app.jsx';
import * as actions from '../lib/app/js/store/actions';

// Config enzyme work with react v16.
configure({ adapter : new Adapter() });

test('shallow', (t) => {
    const wrapper = shallow(<App />);
    t.is(wrapper.contains(<div className="testClass">Venikman</div>), true);
});

test('2', (t) => {
    const wrapper = shallow(<App />);
    const fooInner = wrapper.find('.testClass');
    t.is(fooInner.is('.testClass'), true);
});

test('toggleTodo action', (t) => {
    t.deepEqual(actions.toggleTodo(5), {
        type    : actions.TOGGLE_TODO,
        payload : 5
    });
});
