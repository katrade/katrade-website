import React, { useState } from "react";

export const useForm = () => {
  const [state, setState] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setState((state: any) => ({ ...state, [e.target.name]: e.target.value }));
  };
  return [state, handleChange];
};
