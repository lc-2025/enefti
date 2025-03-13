import React from 'react';

/**
 * @description  Modal Popup
 * @author Luca Cattide
 * @date 13/03/2025
 * @param {{
 *   children: React.ReactNode;
 * }} {
 *   children,
 * }
 * @returns {*}  {React.ReactNode}
 */
const Modal = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return (
    <div className="modal">
      {children}
    </div>
  );
};

export default Modal;
