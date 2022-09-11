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
  .article {
    border-radius: 20px;
    margin-bottom: 20px;
  }
  .taxonomy-list {
    display: flex;
    justify-content: center;
    align-items: baseline;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 16px;
    a {
      color: $black;
    }
  }
  .category .taxonomy-list-link {
    background: $category;
    padding: 4px 10px;
    border-radius: 20px;
    min-width: 68px;
    text-align: center;
    line-height: 1;
    display: block;
    color: $black;
    font-weight: $Bold;
    border-bottom: none;
    &:hover {
      border-bottom: none;
    }
  }
  .tag .taxonomy-list-link {
    padding: 4px 10px;
    border-radius: 20px;
    min-width: 68px;
    text-align: center;
    line-height: 1;
    border: 1px solid $border1;
    color: $black;
    display: block;
    font-weight: $Bold;
    &:hover {
      border: 1px solid $border1;
    }
  }
  .taxonomy-list-item {
    margin-right: 4px;
    margin-left: 4px;
    margin-bottom: 8px;
  }
  .taxonomy-list-link {
    font-size: 11px;
  }
  .title {
    font-size: 32px;
    font-weight: $Bold;
    line-height: 1.4;
    text-align: center;
    margin-bottom: 24px;
  }
  .timestamp {
    text-align: center;
    display: block;
    font-size: 12px;
    font-weight: $Bold;
    line-height: 1.4;
    margin-bottom: 20px;
  }
  .post-image {
    margin-bottom: 30px;
  }
  .post-image-image {
    width: 100%;
    max-height: 500px;
    height: auto;
    border-radius: 20px;
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
    .article {
      padding: 20px 15px;
      margin-bottom: 30px;
    }
    .content {
      margin-bottom: 0;
    }
    .category .taxonomy-list-link,
    .tag .taxonomy-list-link {
      padding: 12px;
      font-size: 12px;
    }
    .title {
      font-size: 29px;
      margin-bottom: 18px;
    }
  }
`
