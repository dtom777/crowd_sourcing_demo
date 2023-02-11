import Modal from 'react-modal';
import { memo, VFC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  closeHandler: () => void;
};

Modal.setAppElement('#__next');

const BaseModal: VFC<Props> = ({ children, isOpen, closeHandler }) => {
  const customStyles = {
    overlay: {
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'fixed',
      top: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 30,
    },

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeHandler} style={customStyles}>
      {children}
    </Modal>
  );
};

export default memo(BaseModal);
