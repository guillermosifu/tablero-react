import PropTypes from 'prop-types'
// @mui
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '85%', md: 'auto'},
  maxHeight: '80vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
};




export function TransitionsModal({ isOpen, onClose, children }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style} >
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

TransitionsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.any
}