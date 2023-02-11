/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import client from 'next-auth/client';
import Banner from '@/components/molecules/layout/Banner';

jest.mock('next-auth/client');

describe('Banner', () => {
  test('renders banner is correct', async () => {
    client['useSession'] = jest.fn().mockReturnValue([null, false]);
    const props = {
      title: 'dummy title',
      buttonTitle: 'dummy button title',
    };
    render(<Banner {...props} />);
    // screen.debug();
    expect(await screen.findByText(props.title)).toBeInTheDocument();
    expect(await screen.findByText(props.buttonTitle)).toBeInTheDocument();
  });
});
