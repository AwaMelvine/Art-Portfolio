import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 30%;
  margin: 2rem auto;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  background: white;
  padding: 2rem;
  color: #555;
  font-family: "Lora", serif;

  h2 {
    text-align: center;
    margin-top: 0px;
  }

  ul.msg {
    list-style: none;
    padding-left: .4rem;
    border: 1px solid orange;
    position: relative;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;

    &.error {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }

    &.success {
      color: #0c5460;
      background-color: #d1ecf1;
      border-color: #bee5eb;
    }
  }



  div {
    margin-bottom: 0.35rem;
    p {
      text-align: center;
      a {
        color: inherit;
        &:hover {
          color: #4880d6;
        }
      }
    }

    label {
      display: block;
    }

    input,
    select {
      width: 100%;
      font-size: 1.1rem;
      padding: 0.8rem 1rem;
      margin: 8px 0;
      font-family: "Lora", serif;
      color: #555;
      outline: none;
      border: 1px solid #e6e6e6;
      border-radius: 4px;

      &:focus {
        border: 1px solid #4880d6;
      }
    }
    select {
      height: 48px;
    }
    button[type="submit"] {
      background: #5858b7;
      color: white;
      border: none;
      text-align: center;
      display: inline-block;
      font-size: 1.2rem;
      font-family: "Lora", serif;
      margin: 4px 2px;
      padding: 0.8rem 1.2rem;
      width: 100%;
      cursor: pointer;
      border-radius: 4px;
      outline: none;
      &:hover {
        background: #3f3f8c;
      }
    }
  }
`;