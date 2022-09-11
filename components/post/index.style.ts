import css from 'styled-jsx/css'

export default css.global`
  @import '../../styles/variable';
  .content-post {
    font-size: 16px;
    line-height: 1.8;
    h2 {
      font-weight: $Bold;
      font-size: 28px;
      margin-top: 54px;
      margin-bottom: 20px;
    }
    h3 {
      font-weight: $Bold;
      font-size: 24px;
      margin-top: 45px;
      margin-bottom: 20px;
    }
    h4 {
      font-weight: $Bold;
      font-size: 22px;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    h5 {
      font-weight: $Bold;
      font-size: 20px;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    p {
      margin-bottom: 40px;
      font-weight: $Regular;
    }
    a {
      color: darken($color2, 20%);
    }
    blockquote {
      font-size: 16px;
      margin-top: 65px;
      margin-bottom: 65px;
      padding-left: 60px;
      padding-right: 60px;
      position: relative;
      background-color: $color1;
      padding-top: 40px;
      padding-bottom: 30px;
      border-radius: 20px;
      &::before {
        content: '“';
        position: absolute;
        top: 10px;
        left: 0;
        font-size: 100px;
        line-height: 0.42;
        color: $black;
      }
    }
    pre {
      margin-top: 20px;
      margin-bottom: 20px;
      width: 100%;
    }
    code {
      background-color: $color2;
      display: block;
      padding: 20px 25px;
      white-space: pre-wrap;
      border-radius: 20px;
      font-size: 85%;
    }
    ul {
      padding-left: 15px;
      list-style: disc outside;
    }
    ol {
      padding-left: 20px;
    }
    ul,
    ol {
      margin-right: 0;
      margin-left: 15px;
      margin-bottom: 40px;
    }
    li {
      margin-bottom: 10px;
    }
    ul li ul {
      list-style: circle outside;
    }
    ol,
    ol li ol {
      list-style: decimal outside;
    }
    ul ul,
    ul ol,
    ol ol,
    ol ul {
      font-size: 90%;
      margin: 15px 0;
    }
    img {
      width: 100%;
      margin-top: 50px;
      margin-bottom: 50px;
      border-radius: 20px;
    }
    table {
      font-size: 14px;
      display: table;
      width: 100%;
      max-width: 100%;
      border-spacing: 0;
      border-collapse: collapse;
      text-align: left;
      background-color: transparent;
      margin-bottom: 40px;
    }
    th {
      font-size: 16px;
      border-top: 1px solid #b8b8bd;
    }
    th,
    td {
      display: table-cell;
      padding: 10px 12px;
      border-bottom: 1px solid #b8b8bd;
    }
    th:first-child,
    td:first-child {
      padding-left: 5px;
    }
    th:last-child,
    td:last-child {
      padding-right: 5px;
    }
    th,
    td {
      display: table-cell;
      padding: 10px 12px;
      border-bottom: 1px solid #b8b8bd;
    }
    th:first-child,
    td:first-child {
      padding-left: 5px;
    }
    th:last-child,
    td:last-child {
      padding-right: 5px;
    }
    iframe {
      margin-top: 50px;
      margin-bottom: 50px;
      height: auto;
      width: 100%;
      aspect-ratio: 16/9;
    }
    @media screen and (max-width: 767px) {
      h2 {
        font-size: 20px;
        margin-top: 45px;
      }
      h3 {
        font-size: 18px;
        margin-top: 40px;
      }
      h4 {
        font-size: 18px;
        margin-top: 35px;
      }
      h5 {
        font-size: 18px;
        margin-top: 30px;
      }
      p {
        font-size: 16px;
        line-height: 1.7;
        margin-bottom: 20px;
      }
      blockquote {
        padding-right: 32px;
        padding-left: 32px;
        margin-bottom: 40px;
        &::before {
          font-size: 62px;
        }
      }
      pre {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      ul {
        margin-bottom: 20px;
      }
      ol {
        margin-bottom: 20px;
      }
      table {
        margin-bottom: 20px;
        font-size: 14px;
      }
      iframe {
        margin-bottom: 20px;
      }
      .table-scroll {
        overflow-x: auto;
      }
    }
  }
`
