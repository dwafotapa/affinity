import React from 'react';
import { shallow } from 'enzyme';
import { MatchList } from './MatchList';
import SidebarContainer from '../../components/Sidebar/SidebarContainer';
import Main from '../../components/Main/Main';
import { getDefaultFilters } from '../../components/Sidebar/reducer';

const setup = () => {
  const props = {
    isFetching: false,
    hasFetchFailed: false,
    filters: getDefaultFilters(),
    items: [],
    fetchMatches: jest.fn()
  };
  
  const wrapper = shallow(<MatchList {...props}/>);

  return {
    props,
    wrapper
  };
};

describe('<Matches/>', () => {
  describe('render() / componentDidMount()', () => {
    it('should render a <SidebarContainer/> and a <Main/> and call fetchMatches()', () => {
      const { props, wrapper } = setup();

      expect(wrapper.find(SidebarContainer)).toHaveLength(1);
      expect(wrapper.find(Main)).toHaveLength(1);
      expect(props.fetchMatches.mock.calls.length).toBe(1);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should not call fetchMatches() if the filters don\'t change', () => {
      const {props, wrapper } = setup();
      
      expect(props.fetchMatches.mock.calls.length).toBe(1);
      
      wrapper.setProps({ filters: props.filters });
      
      expect(props.fetchMatches.mock.calls.length).toBe(1);
    });

    it('should call fetchMatches() if the filters change', () => {
      const {props, wrapper } = setup();

      expect(props.fetchMatches.mock.calls.length).toBe(1);
      
      wrapper.setProps({ filters: { hasPhoto: true } });
      
      expect(props.fetchMatches.mock.calls.length).toBe(2);
    });
  });
});