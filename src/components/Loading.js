import React from 'react';

import { Spinner } from 'react-bootstrap';

/**
 * Quick component to indicate a page is loading before it has its data.
 */
export default function Loading() {
  return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
}
