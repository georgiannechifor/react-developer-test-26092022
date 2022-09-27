import React from 'react';
import { shallow } from 'enzyme';
import LoadingButton from '../components/LoadingButton';

describe('Loading Button', () => {
  it('should render LoadingButton component', () => {
    const wrapper = shallow(<LoadingButton />);
    expect(wrapper.find({ 'data-testid': 'load-more' })).toHaveLength(1);
  })
  
  it('should render LoadingButton in loading state', () => {
    const wrapper = shallow(<LoadingButton isLoading />);
    expect(wrapper.find({ 'data-testid' : 'loader'})).toHaveLength(1);
  })
})


