import React from 'react';
import { ApolloError } from '@apollo/client';
import { TEST } from '@/utilities/constants';

/**
 * @description Error message
 * @author Luca Cattide
 * @date 13/03/2025
 * @param {{ error: string }} { error }
 * @returns {*}  {React.ReactNode}
 */
const CustomError = ({ error }: { error: ApolloError }): React.ReactNode => {
  const { name, message } = error;

  return (
    // Error Start
    <aside className="error" data-testid={TEST.ID.ERROR}>
      <h2 className="error__title">Error</h2>
      <p className="error__message">
        {name}: {message}
      </p>
    </aside>
    // Error End
  );
};

export default CustomError;
