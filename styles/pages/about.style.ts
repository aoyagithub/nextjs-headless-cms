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
  }
  @media screen and (max-width: 767px) {
    .inner {
      width: calc(100% - 30px);
    }
    .content {
      margin-bottom: 0;
    }
  }
`
