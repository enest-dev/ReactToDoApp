import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Dialog } from '@shared';

describe('Dialog Component', () => {
  it('should render without errors', () => {
    const wrapper: ShallowWrapper = shallow(<Dialog />);

    expect(wrapper).toHaveLength(1);
  });
});
