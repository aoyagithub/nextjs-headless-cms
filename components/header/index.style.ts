import css from 'styled-jsx/css'

export default css`
  @import '../../styles/variable';

  .header {
    font-family: 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Helvetica, Arial, Meiryo, sans-serif;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;

    z-index: 5;
    &.active {
      .header-nav-line {
        background-color: #fff;
      }
      path {
        fill: #fff;
      }
      .inner.header-bottom {
        display: none;
      }
    }

    .inner {
      height: 60px;
      border-bottom: 1px solid $border1;
      position: relative;
      z-index: 20;
      &.header-top {
        height: 85px;
      }
    }
  }

  .header-link {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 20;
    transform: translateX(-50%) translateY(-50%);
    border-bottom: none;
    &:hover {
      border-bottom: none;
    }
  }
  .header-title {
    font-size: 34px;
    font-weight: $ExtraBold;
    display: flex;
    align-items: center;
    color: #2b3a4f;
    &-img {
      transition: all 0.5s;
      width: 80%;
      margin: auto;
    }
  }
  .header-active .header-title {
    color: #fff;
  }
  .header-nav {
    position: absolute;
    left: 20px;
    overflow: hidden;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    width: 24px;
    height: 20px;
    cursor: pointer;
    z-index: 20;
    &.open {
      .header-nav-line {
        &:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        &:nth-child(2) {
          transform: rotate(45deg);
        }
        &:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
      }
    }
  }
  .header-nav-line {
    display: block;
    position: absolute;
    width: 18px;
    height: 3px;
    background-color: #c4c4c4;
    left: 0;
    border-radius: 2px;
    transition: transform 0.2s ease-in;
    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      top: 7px;
    }
    &:nth-child(3) {
      top: 14px;
    }
  }
  .header-search {
    position: absolute;
    right: 20px;
    width: 24px;
    height: 24px;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    cursor: pointer;
    z-index: 20;
  }
  .header-overlay.active {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(darken($color2, 70%), 0.8);
    backdrop-filter: blur(4px);
    z-index: 10;
    overflow: hidden;
    color: #fff;
    a {
      color: #fff;
    }
    .inner {
      top: 85px;
      position: absolute;
      left: 50%;
      height: 100%;
      transform: translateX(-50%);
      border: none;
      overflow-y: auto;
    }
  }
  .header-overlay-content {
    display: flex;
    padding-top: 20px;
  }
  .header-overlay-content-search {
    height: calc(100% - 240px);
    position: relative;
  }
  .header-overlay-content-input {
    font-size: 20px;
    padding: 12px 40px 12px 2%;
    margin-right: auto;
    margin-left: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid $border1;
    color: #fff;
    outline: none;
    border-radius: 0;
    &::placeholder {
      color: rgba(255, 255, 255, 0.85);
    }
  }
  .header-overlay-item {
    width: 33.33%;
    &.links {
      padding-left: 50px;
      font-weight: $Bold;
      .header-overlay-item-list-item {
        margin-bottom: 20px;
      }
    }
  }
  .header-overlay-item-title {
    line-height: 1.6;
    font-size: 24px;
    font-weight: $Bold;
    margin-bottom: 0.5em;
  }
  .header-overlay-item-list-item {
    line-height: 1.8;
    font-size: 18px;
    margin-bottom: 0.25em;
  }
  .tag .header-overlay-item-list-item {
    display: inline-block;
    margin-right: 6px;
    margin-left: 6px;
    margin-bottom: 10px;
  }
  .tag .header-overlay-item-list-link {
    padding: 6px 18px;
    border-radius: 20px;
    border: 1px solid #fff;
    color: #fff;
    display: block;
    text-align: center;
    min-width: 68px;
    line-height: 1;
    font-size: 18px;
    &:hover {
      border: 1px solid #fff;
    }
  }
  .scrolled {
    .inner.header-bottom {
      display: none;
    }
  }
  .header-submenu {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    &-link {
      padding-right: 10px;
      padding-left: 10px;

      color: $black;
      font-weight: $Bold;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: none;
      &:hover {
        border-bottom: none;
      }
    }
    &-en {
      font-size: 17px;
      font-weight: $ExtraBold;
    }
    &-ja {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    .header-title {
      font-size: 16px;
      justify-content: center;
    }
  }

  @media screen and (max-width: 767px) {
    .header {
      border-bottom: 1px solid $border1;
    }
    .header .inner {
      &.header-top {
        height: 60px;
      }
      &.header-bottom {
        display: none;
      }
      border-bottom: none;
    }
    .header-nav {
      bottom: auto;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
    }
    .header-search {
      bottom: auto;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 20px;
      height: 20px;
    }
    .header-link {
      width: 210px;
    }
    .header-overlay.active .inner.header-top {
      height: calc(100% - 60px);
    }
    .header-overlay-content {
      flex-direction: column;
    }
    .header-overlay-item {
      width: 100%;
      & + .header-overlay-item {
        margin-top: 1em;
      }
    }
    .header-overlay-item-title {
      font-size: 18px;
      line-height: 1.4;
      margin-bottom: 20px;
    }
    .header-overlay-item-list-item {
      font-size: 16px;
    }
    .header-overlay.active .inner {
      top: 70px;
    }
    .category .header-overlay-item-list {
      display: flex;
      flex-wrap: wrap;
      .header-overlay-item-list-item {
        min-width: 50%;
      }
    }
    .tag .header-overlay-item-list-item {
      margin-right: 8px;
      margin-left: 8px;
    }

    .tag .header-overlay-item-list-link {
      font-size: 12px;
      padding: 12px;
      min-width: 78px;
    }
    .header-overlay-content-input {
      width: 100%;
    }
    .header-overlay-item + .header-overlay-item {
      padding-left: 0;
    }
  }
`
