const validateRequest = (request) => {
  let status = true;
  const errors = [];

  if (!request.body.title) {
    const msg = 'No title was inputed!';
    errors.push(msg);
    status = false;
  }
  return Object.assign({}, status, errors);
};

export default validateRequest;
