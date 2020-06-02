import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Layout } from "@shared";

describe("Layout Component", () => {
  it("should render without errors", () => {
    const wrapper: ShallowWrapper = shallow(<Layout />);

    expect(wrapper).toHaveLength(1);
  });
});
