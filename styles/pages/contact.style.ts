import css from 'styled-jsx/css'

export default css`
  @import '../variable';
  .content {
    display: flex;
    justify-content: space-between;
    font-family: 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Helvetica, Arial, Meiryo, sans-serif;
    margin-bottom: 90px;
  }
  .main {
    width: 780px;
  }
  .aside {
    width: 354px;
  }
  h1 {
    font-size: 32px;
    font-weight: $Bold;
    margin-bottom: 1em;
  }
  h2 {
    font-weight: $Bold;
    margin-top: 60px;
    font-size: 28px;
  }
  p {
    font-size: 16px;
    line-height: 1.8;
    margin-top: 1em;
  }
  input,
  button,
  select,
  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border: none;
    border-radius: 0;
    font: inherit;
    outline: none;
  }

  textarea {
    resize: vertical;
  }

  input[type='checkbox'],
  input[type='radio'] {
    display: none;
  }

  input[type='submit'],
  input[type='button'],
  label,
  button,
  select {
    cursor: pointer;
  }

  select::-ms-expand {
    display: none;
  }
  .item {
    width: 80%;
    & + .item {
      margin-top: 1em;
    }
  }
  .input {
    background-color: $color1;
    font-size: 20px;
    width: 100%;
    border-radius: 100px;
    padding: 0.5em 1em;
    &::placeholder {
      color: #c4c4c4;
    }
  }
  .message {
    border: 4px solid $color1;
    font-size: 20px;
    width: 100%;
    border-radius: 20px;
    padding: 0.5em 1em;
    &::placeholder {
      color: #c4c4c4;
    }
  }
  .button {
    font-weight: $Bold;
    font-size: 20px;
    color: #fff;
    background-color: #c4c4c4;
    border-radius: 100px;
    padding: 0.5em 1.5em;
    transition: all 0.5s;
    &:hover {
      background-color: #4e473f;
    }
  }
  .form-thanks {
    font-size: 20px;
    font-weight: $Bold;
    border-radius: 100px;
    color: #fff;
    background-color: #c4c4c4;
    text-align: center;
    padding: 0.5em 1em;
  }
  @media screen and (max-width: 1180px) {
    .main {
      width: 66%;
    }
    .aside {
      width: 30%;
    }
  }
  @media screen and (max-width: 820px) {
    .content {
      flex-direction: column;
    }
    .main {
      width: 100%;
      margin-bottom: 50px;
    }
    .aside {
      width: 100%;
    }
    h1 {
      text-align: center;
    }
    .item {
      margin-right: auto;
      margin-left: auto;
    }
  }
  @media screen and (max-width: 767px) {
    .inner {
      width: calc(100% - 30px);
    }
    .content {
      margin-bottom: 0;
    }
    h1 {
      font-size: 30px;
      margin-bottom: 40px;
    }
    h2 {
      font-size: 20px;
      margin-bottom: 12px;
    }
    p {
      font-size: 18px;
      margin-bottom: 28px;
    }
    .item {
      width: 100%;
    }
    .button {
      width: 100%;
    }
  }
`
