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
    width: 734px;
  }
  .aside {
    width: 354px;
  }
  .list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 50px;
  }
  .item {
    width: 352px;
    height: 279px;
    border-radius: 20px;
    margin-bottom: 30px;
    background-color: $color1;
    font-weight: $Bold;
    &:nth-last-child(-n + 2) {
      margin-bottom: 0;
    }
  }
  .link {
    display: block;
    color: $black;
    border-bottom: none;
  }
  .image {
    height: 151px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }
  .item-content {
    height: calc(279px - 151px);
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 14px 16px;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
  }
  .title {
    font-size: 15px;
    line-height: 1.6;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;
  }
  .detail {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: baseline;
    width: 100%;
    font-size: 12px;
  }
  .category {
    background: $category;
    padding: 4px 10px;
    border-radius: 20px;
    min-width: 68px;
    text-align: center;
    line-height: 1;
  }
  .taxonomy-heading {
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: $Bold;
    padding-bottom: 0.25em;
    border-bottom: 2px solid rgba(186, 179, 161, 0.6);
  }
  @media screen and (max-width: 1180px) {
    .main {
      width: 63%;
    }
    .aside {
      width: 30%;
    }
    .item {
      width: 48%;
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
    .item {
      width: 100%;
      height: auto;
      &:nth-last-child(2) {
        margin-bottom: 30px;
      }
    }
    .content {
      margin-bottom: 0;
    }
    .inner {
      width: calc(100% - 40px);
    }
    .image {
      height: 200px;
    }
    .item-content {
      height: 170px;
    }
    .title {
      font-size: 20px;
    }
    .category {
      padding: 12px;
    }
    .timestamp {
      font-size: 14px;
    }
    .item-content {
      padding: 20px 20px 14px;
    }
  }
`
