import { UseFormRegisterReturn } from 'react-hook-form';

export const convert = ({ ref, ...others }: UseFormRegisterReturn) => {
  return { inputRef: ref, ...others };
};
