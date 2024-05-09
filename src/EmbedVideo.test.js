import React from 'react';
import { render, screen } from '@testing-library/react';
import EmbedVideo from './EmbedVideo';

test('renders a playable video on the page', () => {
  render(<EmbedVideo />);
  
  // Check if there is a video element
  const videoElement = screen.getByTestId('video');
  expect(videoElement).toBeInTheDocument();

  // Check if the video is playable
  expect(videoElement).toHaveAttribute('controls'); // Assuming the video has controls for playback
  expect(videoElement).not.toHaveAttribute('muted'); // Assuming the video is not muted by default
});
 