import React from 'react';
import { shallow } from 'enzyme';
import Body from './Body';

describe('<Body/>', () => {
  it('should render children when passed in', () => {
    const wrapper = shallow(
      <Body><p className="someClass">someText</p></Body>
    );

    expect(wrapper.contains(<p className="someClass">someText</p>)).toBe(true);
  });
});