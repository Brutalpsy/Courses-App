import React from 'react';
import Header from './Header';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

it('contains three NavLinks via shallow', () => {
  const navLinks = shallow(<Header />).find('NavLink').length;
  expect(navLinks).toEqual(3);
});

it('contains three anchors via mount', () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find('a').length;

  expect(numAnchors).toEqual(3);
});
