import React from 'react';
import { shallow } from 'enzyme';
import Table from '../components/Table';

describe('Table', () => {
  it('should render Table component', () => {
    const wrapper = shallow(<Table />);
    expect(wrapper.find({ 'data-testid': 'app-table' })).toHaveLength(1);
  })
})


