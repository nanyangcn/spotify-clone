type ErrWithMsg = {
  message: string,
};

const isErrWithMsg = (error: unknown): error is ErrWithMsg => (
  typeof error === 'object'
  && error !== null
  && 'message' in error
  && typeof (error as Record<string, unknown>).message === 'string'
);

const toErrWithMsg = (maybeError: unknown): ErrWithMsg => {
  if (isErrWithMsg(maybeError)) {
    return maybeError;
  }

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
};

const getErrMsg = (error: unknown): string => toErrWithMsg(error).message;

export {
  isErrWithMsg,
  toErrWithMsg,
  getErrMsg,
};
