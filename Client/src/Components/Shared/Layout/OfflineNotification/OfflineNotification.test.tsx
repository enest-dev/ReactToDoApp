import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { PureOfflineNotification } from './OfflineNotification';

describe('Offline Notification Component', () => {
  let classes;

  beforeEach(() => {
    classes = { offlineNotification: 'test' };
  });
  it('should render without errors', () => {
    const message: string = 'There appears to be a connection problem. Please check your internet connection.';
    const wrapper: ShallowWrapper = shallow(<PureOfflineNotification message={message} classes={classes} />);

    expect(wrapper).toHaveLength(1);
  });
});
