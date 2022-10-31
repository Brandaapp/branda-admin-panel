const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles (name, orgAccess, theme) {
  return {
    fontWeight:
      orgAccess.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const handleChange = (setOrgAccess, event) => {
  const {
    target: { value }
  } = event;
  setOrgAccess(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value
  );
};

const validEmail = email => {
  return email === '' ||
    String(email)
      .toLowerCase()
      .match(
        /^\S+@\S+\.\S+$/
      );
};

const passwordsMatch = (password, passwordConfirmation) => {
  return password === passwordConfirmation;
};

const validUserState = (username, email, password, userType, passwordConfirmation) => {
  return (
    username !== '' && // username filled it
    email !== '' && // email filled in
    password !== '' && // password filled in
    userType !== '' && // user type filled in
    passwordsMatch(password, passwordConfirmation) && // passwords match
    validEmail(email) // valid email provided
  );
};

export {
  getStyles,
  MenuProps,
  handleChange,
  validEmail,
  passwordsMatch,
  validUserState
};
