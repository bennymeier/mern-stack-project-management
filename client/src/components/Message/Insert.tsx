import React, { useEffect, useState } from "react";
import { createMessage } from "../../utils/API";

const Insert = () => {
  const [message, setMessage] = useState("");
  const [callbackMessage, setCallbackMessage] = useState("");
  useEffect(() => {}, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const send = await createMessage({
      body: message,
      to: "meier.robi@web.de",
      from: "meier.benjamin@web.de",
    });
    const { message: cbMessage, success } = send;
    setCallbackMessage(cbMessage);
    if (success) {
      setMessage("");
    }
  };

  return (
    <>
      <p>{callbackMessage}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message</label>
        <textarea
          value={message}
          name="message"
          id="message"
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send message</button>
      </form>
    </>
  );
};
export default Insert;
