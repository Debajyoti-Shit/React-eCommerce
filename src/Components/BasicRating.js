import * as React from 'react';
import Rating from '@mui/material/Rating';

export default function BasicRating({ value }) {

  return (
    // Use the MUI Rating component to render the rating UI
    <Rating
      name="simple-controlled"
      value={value ? value : 0}
    />
  )
}