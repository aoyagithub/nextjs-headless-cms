import css from 'styled-jsx/css'

export default css`
  @import '../../styles/variable';
  .share {
    margin-top: 80px;
    margin-bottom: 40px;
  }
  .share-list {
    display: flex;
    justify-content: center;
  }
  .share-list-item {
    margin-right: 10px;
    margin-left: 10px;
  }
  .share-list-link {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    transition: all 0.5s;
    background-color: lighten(#c4c4c4, 8%);
    display: block;
    position: relative;
    cursor: pointer;
    &:hover {
      background-color: darken(#c4c4c4, 8%);
    }
  }
  .clipboard-text {
    text-align: center;
    font-size: 14px;
    margin-top: 1em;
  }
  .share-list-img {
    position: absolute;
    left: 50%;
    &-twitter {
      width: 28px;
      top: 54%;
      transform: translate(-50%, -54%);
    }
    &-facebook {
      width: 34px;
      top: 52%;
      transform: translate(-50%, -52%);
    }
    &-clipboard {
      width: 24px;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @media screen and (max-width: 767px) {
    .share {
      margin-top: 40px;
    }
    .share-list-link {
      width: 54px;
      height: 54px;
    }
  }
`
