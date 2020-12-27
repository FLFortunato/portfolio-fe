import React, { useState } from "react";

import "./aleatory.scss";
import { Container, StyledInput, StyledForm } from "./styled";

export const AleatoryPage = () => {
  const [anyState, setAnyState] = useState(" ");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (data: any) => {
    data.preventDefault();
    console.log(anyState);
  };
  return (
    <Container>
      <StyledForm>
        <div>Anything here</div>
        <StyledInput onChange={(e) => setAnyState(e.target.value)} />
        <StyledInput onChange={(e) => setAge(e.target.value)} />
        <StyledInput onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" onClick={handleSubmit}>
          Click here to Send
        </button>
      </StyledForm>
      <div>{anyState}</div>
    </Container>
  );
};
