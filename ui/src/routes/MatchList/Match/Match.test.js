import React from 'react';
import { shallow } from 'enzyme';
import Match from './Match';

const setup = () => {
  const props = {
    match: {
      display_name: '',
      compatibility_score: '',
      height_in_cm: '',
      city: {
        name: ''
      },
      job_title: ''
    }
  };
  
  const wrapper = shallow(<Match {...props}/>);

  return {
    props,
    wrapper
  };
};

describe('<Match/>', () => {
  it('should return an <img/> element', () => {
    const { props, wrapper } = setup();
    
    expect(wrapper.find('img')).toHaveLength(1);
  });
});