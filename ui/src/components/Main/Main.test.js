import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';

describe('<Main/>', () => {
  it('should render children when passed in', () => {
    const wrapper = shallow(
      <Main><p className="someClass">someText</p></Main>
    );

    expect(wrapper.contains(<p className="someClass">someText</p>)).toBe(true);
  });
});