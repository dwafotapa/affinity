import React from 'react';
import { shallow } from 'enzyme';
import Heading from './Heading';

describe('<Heading/>', () => {
  it('should render children when passed in', () => {
    const wrapper = shallow(
      <Heading><p className="someClass">someText</p></Heading>
    );

    expect(wrapper.contains(<p className="someClass">someText</p>)).toBe(true);
  });
});