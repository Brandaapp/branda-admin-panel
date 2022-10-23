import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SpeedDialPicker ({ addAction, editAction, deleteAction }) {
  const actions = [
    { icon: <AddIcon />, name: 'Add New Place', action: addAction || (() => {}) },
    { icon: <EditIcon />, name: 'Edit Current Place', action: editAction || (() => {}) },
    { icon: <DeleteIcon />, name: 'Delete Current Place', action: deleteAction || (() => {}) }
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial picker"
      sx={{ position: 'fixed', bottom: 30, right: 45 }}
      icon={<SettingsIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
        />
      ))}
    </SpeedDial>
  );
}
