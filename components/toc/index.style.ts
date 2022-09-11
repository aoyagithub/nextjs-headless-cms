import css from 'styled-jsx/css'

export default css`
  @import '../../styles/variable';
  .toc {
    background-color: $color1;
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 40px;
  }
  .title {
    font-size: 24px;
    font-weight: $Bold;
    line-height: 1.16;
    margin-bottom: 1em;
  }
  .link {
    color: $black;
    font-size: 20px;
    line-height: 1.5;
  }
  .list {
    font-size: 20px;
    line-height: 1.5;
  }
  .item {
    margin-bottom: 0.75em;
    &.h2 {
      list-style: disc outside;
      margin-left: 1em;
    }
    &.h3 {
      list-style: circle outside;
      margin-left: 2em;
      .link {
        font-size: 90%;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  @media screen and (max-width: 767px) {
    .title {
      font-size: 20px;
    }
  }
`
