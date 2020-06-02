import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { MainNav } from '@shared';
import { MemoryRouter } from 'react-router';

describe('Main Nav Component', () => {
  it('should render without errors', () => {
    const wrapper: ShallowWrapper = shallow(
      <MemoryRouter keyLength={0}>
        <MainNav />
      </MemoryRouter>,
    );

    expect(wrapper).toHaveLength(1);
  });
});
