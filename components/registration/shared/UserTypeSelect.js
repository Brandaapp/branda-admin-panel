import { Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Box } from '@mui/material';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { MenuProps, getStyles, handleChange } from '../utils';
import consts from '../consts.json';

const { userTypes } = consts;

export default function UserRoleContent ({ userType, setUserType, setOrgAccess, orgAccess, approvedClubs }) {
  const theme = useTheme();
  const [disableOrgSelect, setDisableOrgSelect] = useState(false);

  return (
    <>
      <FormControl>
        <InputLabel id='usertype-label' required>User Type</InputLabel>
        <Select
          labelId='usertype-label'
          id='usertype'
          value={userType}
          label='User Type'
          onChange={event => {
            const type = event.target.value;
            setUserType(type);
            if (['employee', 'publicsafety', 'joseph'].includes(type)) {
              setDisableOrgSelect(true);
              if (['publicsafety', 'joseph'].includes(type)) {
                setOrgAccess(['General']);
              } else {
                setOrgAccess([]);
              }
            } else {
              setDisableOrgSelect(false);
              const orgs = JSON.clone(orgAccess);
              orgs.splice(orgs.find(name => name === 'General'), 1);
              setOrgAccess(orgs);
            }
          }}
          required
        >
          {userTypes.map(type => {
            return <MenuItem key={type.key} value={type.key}>{type.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id='org-access-select'>Push Notification Access</InputLabel>
        <Select
          labelId='org-access-select'
          multiple
          value={orgAccess}
          disabled={disableOrgSelect}
          onChange={event => handleChange(setOrgAccess, event)}
          input={<OutlinedInput label='Push Notification Access' />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {approvedClubs.map(({ name }) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, orgAccess, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl></>
  );
}
