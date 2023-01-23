import { useState } from 'react';

interface ErrorsProps {
  field: string;
  message: string;
}

export default function useErrors() {
  const [errors, setErrors] = useState<ErrorsProps[]>([]);

  function setError({ field, message }: ErrorsProps) {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [...prevState, { field, message }]);
  }

  function removeError(fieldName: string) {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }

  function getErrorMessageByFieldName(fieldName: string) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
