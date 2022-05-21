import { useState } from "react";

const useForm = (handleSubmit) => {
  const [item, setItem] = useState({});

  const _handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    await handleSubmit(item);
    const newItem = {};
    setItem({ newItem });
  };

  return [_handleInputChange, _handleSubmit];
};

export default useForm;
