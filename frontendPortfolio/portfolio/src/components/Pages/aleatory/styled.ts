import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: black;
  color: white;
  height: 100vh;
  width: 100%;
  justify-content: "center";
  align-items: "center";
`;

export const StyledInput = styled.input`
  border-radius: 5px;
  margin-top: 10px;
  padding: 5px;
`;

export const StyledForm = styled.form`
  display: flex;
  justify-self: center;
  flex-direction: column;
  text-align: center;
  max-width: 400px;
`;
