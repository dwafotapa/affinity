import React from 'react';
import { shallow, mount } from 'enzyme';
import InputRange from 'react-input-range';
import Sidebar from './Sidebar';
import { getDefaultFilters } from './reducers';

const setup = () => {
  const props = {
    filters: getDefaultFilters(),
    setFilter: jest.fn(),
    removeFilter: jest.fn(),
    resetFilters: jest.fn()
  };
  
  const wrapper = mount(<Sidebar {...props}/>);

  return {
    props,
    wrapper
  };
};

describe('<Sidebar/>', () => {
  it('should render 3 checkboxes, 4 <InputRange/> and a button', () => {
    const { wrapper } = setup();

    expect(wrapper.find('input')).toHaveLength(3);
    expect(wrapper.find(InputRange)).toHaveLength(4);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('should call setFilter if a checkbox is checked', () => {
    const { wrapper, props } = setup();
    const checkbox = wrapper.find('#hasPhoto');
    const event = {
      target: {
        name: 'hasPhoto',
        checked: true
      }
    };

    checkbox.props().onChange(event);

    expect(props.setFilter.mock.calls.length).toBe(1);
  });

  it('should call removeFilter if a checkbox is unchecked', () => {
    const { wrapper, props } = setup();
    const checkbox = wrapper.find('#hasPhoto');
    const event = {
      target: {
        name: 'hasPhoto',
        checked: false
      }
    };

    checkbox.props().onChange(event);
    
    expect(props.removeFilter.mock.calls.length).toBe(1);
  });

  it('should call resetFilters if the reset button is clicked', () => {
    const { wrapper, props } = setup();
    const checkbox = wrapper.find('button');
    const event = { preventDefault: () => {} };

    checkbox.props().onClick(event);
    
    expect(props.resetFilters.mock.calls.length).toBe(1);
  });
});