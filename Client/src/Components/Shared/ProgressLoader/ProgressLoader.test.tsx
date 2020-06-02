import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import { PureProgressLoader } from './ProgressLoader';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
  type?: 'linear' | 'circle';
  size?: number;
  thickness?: number;
};

describe('ProgressLoader component', () => {
  const defaultProps: Props = {
    type: 'linear',
    size: 50,
    thickness: 5,
  };

  it('should be rendered without errors', () => {
    const wrapper: ShallowWrapper = shallow(<PureProgressLoader {...defaultProps} />);

    expect(wrapper).toHaveLength(1);
  });

  it('should render linear loader', () => {
    const wrapper: ShallowWrapper = shallow(<PureProgressLoader {...defaultProps} />);

    expect(wrapper.find(LinearProgress)).toHaveLength(1);
    expect(wrapper.find(CircularProgress)).toHaveLength(0);
  });

  it('should render circle loader', () => {
    const props: Props = { ...defaultProps, type: 'circle' };
    const wrapper: ShallowWrapper = shallow(<PureProgressLoader {...props} />);

    expect(wrapper.find(CircularProgress)).toHaveLength(1);
    expect(wrapper.find(LinearProgress)).toHaveLength(0);
  });

  it('should render props correctly', () => {
    const props: Props = { ...defaultProps, type: 'circle' };
    const wrapper: ShallowWrapper = shallow(<PureProgressLoader {...props} />);
    const renderedProps: any = wrapper.find(CircularProgress).props();

    expect(renderedProps.size).toEqual(props.size);
    expect(renderedProps.thickness).toEqual(props.thickness);
  });
});
