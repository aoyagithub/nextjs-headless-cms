import css from 'styled-jsx/css'

export default css.global`
  body.header-active {
    overflow: hidden;
  }
  .inner {
    width: 1188px;
    margin-right: auto;
    margin-left: auto;
  }
  .content {
    padding-top: 170px;
  }

  @media screen and (max-width: 1180px) {
    .inner {
      width: 90%;
    }
  }
  @media screen and (max-width: 767px) {
    .inner {
      width: calc(100% - 30px);
    }
    .content {
      padding-top: 90px;
    }
  }

  .scrolled {
    .inner.header-bottom {
      display: none;
    }
  }

  .header-active .header-title {
    color: #fff;
  }
`
