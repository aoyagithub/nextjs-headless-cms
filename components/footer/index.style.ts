import css from 'styled-jsx/css'

export default css`
  @import '../../styles/variable';

  a {
    color: $black;
    font-weight: $Bold;
  }
  .footer {
    background-color: lighten($color2, 10%);
    padding-top: 40px;
    padding-bottom: 60px;
    font-family: 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Helvetica, Arial, Meiryo, sans-serif;
  }
  .footer-content {
    display: flex;
    justify-content: space-between;
  }
  .footer-item {
    width: 33.33%;
    &:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &:nth-child(2) {
      padding-top: 20px;
      margin-right: 50px;
      margin-left: 50px;
    }
    &:nth-child(3) {
      padding-left: 50px;
      padding-top: 20px;
    }
  }
  .footer-title {
    font-weight: $ExtraBold;
    font-size: 30px;
    line-height: 1.36;
    margin-bottom: 20px;
  }
  .footer-text {
    font-size: 14px;
    line-height: 1.5;
  }
  .footer-heading {
    font-size: 18px;
    font-weight: $Bold;
    line-height: 1.4;
    margin-bottom: 20px;
  }
  .tags-list {
    display: flex;
    flex-wrap: wrap;
  }
  .tags-list-item {
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .tags-list-link {
    padding: 4px 10px;
    border-radius: 20px;
    border: 1px solid $border1;
    color: $black;
    display: block;
    text-align: center;
    min-width: 68px;
    line-height: 1;
    font-size: 11px;
    &:hover {
      border: 1px solid $border1;
    }
  }
  .footer-link-item {
    font-size: 16px;
    margin-bottom: 18px;
    line-height: 1.376;
  }
  .footer-copyright {
    font-size: 12px;
    line-height: 1.3;
  }
  @media screen and (min-width: 768px) {
    .sp {
      display: none;
    }
    .footer-item:nth-child(1) {
      min-height: 180px;
    }
  }
  @media screen and (max-width: 767px) {
    .pc {
      display: none;
    }
    .footer {
      padding: 0;
    }
    .footer-content {
      flex-direction: column;
    }
    .footer-item {
      width: 100%;
      &:nth-child(1) {
        order: 2;
        padding-top: 20px;
      }
      &:nth-child(2) {
        order: 1;
        margin-left: 0;
        padding-top: 20px;
      }
      &:nth-child(3) {
        order: 3;
        padding-left: 0;
        padding-top: 30px;
      }
    }
    .tags-list-link {
      font-size: 12px;
      padding: 12px;
      min-width: 78px;
    }
    .footer-link-item {
      margin-left: 0.5em;
      margin-right: 0.5em;
    }
    .footer-title {
      text-align: center;
    }
    .footer-link-list {
      display: flex;
      justify-content: center;
    }
    .footer-copyright {
      text-align: center;
      font-size: 13px;
      margin-bottom: 14px;
    }
  }
`
