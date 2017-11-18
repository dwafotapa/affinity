import React from 'react';
import { shallow, mount } from 'enzyme';
import { Matches } from './Matches';
import SidebarContainer from '../../components/Sidebar/SidebarContainer';
import Main from '../../components/Main/Main';
import { getDefaultFilters } from '../../components/Sidebar/reducers';

const setup = () => {
  const props = {
    isFetching: false,
    hasFetchFailed: false,
    filters: getDefaultFilters(),
    items: [],
    fetchMatches: jest.fn()
  };
  
  const wrapper = shallow(<Matches {...props}/>);

  return {
    props,
    wrapper
  };
};

describe('<Matches/>', () => {
  it('renders a <SidebarContainer/> and a <Main/>', () => {
    const { wrapper } = setup();

    expect(wrapper.find(SidebarContainer)).toHaveLength(1);
    expect(wrapper.find(Main)).toHaveLength(1);
  });
});