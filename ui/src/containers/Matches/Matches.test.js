import React from 'react';
import { shallow, mount } from 'enzyme';
import Matches from './Matches';
import Sidebar from '../../components/Sidebar/Sidebar';
import Main from '../../components/Main/Main';

describe('Matches', () => {
  it('renders a <Sidebar/> component and a <Main/> component', () => {
    const wrapper = shallow(<Matches/>);

    expect(wrapper.find(Sidebar)).toHaveLength(1);
    expect(wrapper.find(Main)).toHaveLength(1);
  });

  it('adds the checkbox filters to the state when checked', () => {
    const wrapper = shallow(<Matches/>);
    const instance = wrapper.instance();

    instance.handleCheckboxChange({
      target: {
        name: 'hasPhoto',
        checked: true
      }
    });

    expect(instance.state.filters).toHaveProperty('hasPhoto', true);
  });

  it('removes the checkbox filters from the state when unchecked', () => {
    const wrapper = shallow(<Matches/>);
    const instance = wrapper.instance();
    instance.state.filters.hasPhoto = true;

    instance.handleCheckboxChange({
      target: {
        name: 'hasPhoto',
        checked: false
      }
    });

    expect(instance.state.filters).not.toHaveProperty('hasPhoto', null);
  });

  it('updates min/max range filters in the state when clicked', () => {
    const wrapper = shallow(<Matches/>);
    const instance = wrapper.instance();

    instance.handleInputRangeChange('ageMix', 'ageMax', { min: 18, max: 45 });

    expect(instance.state.filters).toHaveProperty('ageMin', 18);
    expect(instance.state.filters).toHaveProperty('ageMax', 45);;
  });

  it('sets the isLoading flag to true in the state', () => {
    const wrapper = shallow(<Matches/>);
    const instance = wrapper.instance();

    instance.handleInputRangeChangeComplete();

    expect(instance.state.isLoading).toBe(true);
  });
    
  it('removes the open bounds filter from the state when set to max value', () => {
    const wrapper = shallow(<Matches/>);
    const instance = wrapper.instance();
    instance.state.filters.ageMax = 95;

    instance.handleInputRangeWithOpenBoundsChangeComplete('ageMax', 95);

    expect(instance.state.filters).not.toHaveProperty('ageMax', null);
  });

  it('resets to the default state', () => {
    const wrapper = shallow(<Matches/>);
    const instance = wrapper.instance();
    instance.state.filters.hasPhoto = true;
    instance.state.filters.ageMax = 32;
    instance.state.filters.compatibilityScoreMin = 0.05;
    const e = { preventDefault: () => {} };

    instance.handleResetButtonClick(e);

    expect(instance.state.isLoading).toBe(true);
    expect(instance.state.filters).toEqual({
      compatibilityScoreMin: 0.01,
      compatibilityScoreMax: 0.99,
      ageMin: 18,
      heightMin: 135,
      distanceMin: 0,
      distanceMax: 30
    });
  });
});