import React from 'react';
import { shallow } from 'enzyme';
import InputRange from 'react-input-range';
import Sidebar from './Sidebar';
import { getDefaultFilters } from './reducer';

const setup = () => {
  const props = {
    filters: getDefaultFilters(),
    setFilter: jest.fn(),
    removeFilter: jest.fn(),
    resetFilters: jest.fn()
  };
  
  const wrapper = shallow(<Sidebar {...props}/>);

  return {
    props,
    wrapper
  };
};

describe('<Sidebar/>', () => {
  describe('render()', () => {
    it('should render 3 checkboxes, 4 <InputRange/> and a button', () => {
      const { wrapper } = setup();

      expect(wrapper.find('input')).toHaveLength(3);
      expect(wrapper.find(InputRange)).toHaveLength(4);
      expect(wrapper.find('button')).toHaveLength(1);
    });
  });

  describe('handleCheckboxChange()', () => {
    it('should call setFilter if a checkbox is checked', () => {
      const { props, wrapper } = setup();
      const checkbox = wrapper.find('input[name="hasPhoto"]');
      const event = {
        target: {
          name: 'hasPhoto',
          checked: true
        }
      };

      expect(props.setFilter.mock.calls.length).toBe(0);
      
      checkbox.props().onChange(event);

      expect(props.setFilter.mock.calls.length).toBe(1);
    });
    
    it('should call removeFilter if a checkbox is unchecked', () => {
      const { props, wrapper } = setup();
      const checkbox = wrapper.find('input[name="hasPhoto"]');
      const event = {
        target: {
          name: 'hasPhoto',
          checked: false
        }
      };

      expect(props.removeFilter.mock.calls.length).toBe(0);
      
      checkbox.props().onChange(event);
      
      expect(props.removeFilter.mock.calls.length).toBe(1);
    });
  });

  describe('handleInputRangeChange()', () => {
    it('should update the filters', () => {
      const { props, wrapper } = setup();
      const inputRange = wrapper.find('InputRange[name="compatibilityScore"]');

      expect(wrapper.state().filters.compatibilityScoreMin).toBe(0.01);
      expect(wrapper.state().filters.compatibilityScoreMax).toBe(0.99);

      inputRange.props().onChange({ min: 0.5, max: 0.99 });

      expect(wrapper.state().filters.compatibilityScoreMin).toBe(0.5);
      expect(wrapper.state().filters.compatibilityScoreMax).toBe(0.99);
    });
  });

  describe('handleInputRangeChangeComplete()', () => {
    it('should not call setFilter if the filters don\'t change', () => {
      const { props, wrapper } = setup();
      const inputRange = wrapper.find('InputRange[name="compatibilityScore"]');

      inputRange.props().onChangeComplete({ min: 0.01, max: 0.99 });

      expect(props.setFilter.mock.calls.length).toBe(0);
    });

    it('should call setFilter if the filters change', () => {
      const { props, wrapper } = setup();
      const inputRange = wrapper.find('InputRange[name="compatibilityScore"]');

      expect(props.setFilter.mock.calls.length).toBe(0);
      
      inputRange.props().onChange({ min: 0.5, max: 0.99 });
      inputRange.props().onChangeComplete({ min: 0.5, max: 0.99 });

      expect(props.setFilter.mock.calls.length).toBe(1);
    });
  });

  describe('handleInputRangeWithNoUpperLimitChangeComplete()', () => {
    it('should call setFilter if the right handle is not set to the maximum value', () => {
      const { props, wrapper } = setup();
      const inputRange = wrapper.find('InputRange[name="age"]');

      expect(props.setFilter.mock.calls.length).toBe(0);      

      inputRange.props().onChange({ min: 18, max: 38 });
      inputRange.props().onChangeComplete({ min: 18, max: 38 });

      expect(props.setFilter.mock.calls.length).toBe(1);
    });

    it('should call removeFilter if the right handle is set to the maximum value', () => {
      const { props, wrapper } = setup();
      const inputRange = wrapper.find('InputRange[name="age"]');

      expect(props.removeFilter.mock.calls.length).toBe(0);
      
      wrapper.setProps({
        filters: {
          ageMin: 18,
          ageMax: 50
        }
      });
      inputRange.props().onChange({ min: 18, max: 95 });
      inputRange.props().onChangeComplete({ min: 18, max: 95 });

      expect(props.removeFilter.mock.calls.length).toBe(1);
    });
  });
  
  
  describe('handleResetButtonClick()', () => {
    it('should call resetFilters if the reset button is clicked', () => {
      const { props, wrapper } = setup();
      const checkbox = wrapper.find('button');
      const event = { preventDefault: () => {} };
      
      expect(props.resetFilters.mock.calls.length).toBe(0);
      
      checkbox.props().onClick(event);
      
      expect(props.resetFilters.mock.calls.length).toBe(1);
    });
  });
});