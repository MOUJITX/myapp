type Input = {};

type Output = {};

type LoginHook = {
  input: Input;
  output: Output;
};

export const useLoginHook = (): LoginHook => {
  const input: Input = {};

  const output: Output = {};
  return {
    input,
    output,
  };
};
