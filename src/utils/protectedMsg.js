const protectedMsg = (message) => {
  return `Authentication is required to ${message} song`;
};

export default protectedMsg;
