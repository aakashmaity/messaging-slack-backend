export const internalErrorResponse = (error) => {
  return {
    success: false,
    err: error,
    message: 'Internal server error',
    data: {}
  };
};

export const custommErrorResponse = (error) => {
  if (!error.message && !error.explanation) {
    return internalErrorResponse(error);
  }
  return {
    success: false,
    err: error.explanation,
    message: error.message,
    data: {}
  };
};

export const successResponse = (data, message) => {
  return {
    success: true,
    data,
    message,
    err: {}
  };
};
