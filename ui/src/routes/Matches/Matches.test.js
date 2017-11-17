import React from 'react';
import { shallow, mount } from 'enzyme';
import { Matches } from './Matches';
import SidebarContainer from '../../components/Sidebar/SidebarContainer';
import Main from '../../components/Main/Main';

const props = () => ({
  isFetching: false,
  hasFetchFailed: false,
  filters: {},
  items: [],
  fetchMatches: jest.fn()
});

describe('Matches', () => {
  it('renders a <SidebarContainer/> component and a <Main/> component', () => {
    const wrapper = shallow(<Matches {...props()}/>);

    expect(wrapper.find(SidebarContainer)).toHaveLength(1);
    expect(wrapper.find(Main)).toHaveLength(1);
  });
});