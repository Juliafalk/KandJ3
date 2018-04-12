import variable from "./../variables/platform";

export default (variables = variable) => {
  const contentTheme = {
    ".padder": {
      padding: variables.contentPadding
    },
    flex: 1,
    backgroundColor: 'blue',
    "NativeBase.Segment": {
      borderWidth: 0,
      backgroundColor: 'blue'
    }
  };

  return contentTheme;
};
