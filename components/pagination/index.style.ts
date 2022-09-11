import css from 'styled-jsx/css'

export default css`
  @import '../../styles/variable';
  .pagination {
    display: flex;
    justify-content: center;
  }
  .page {
    margin-right: 3px;
    margin-left: 3px;
  }
  .omission {
    margin: 4px 3px;
    width: 24px;
    text-align: center;
  }
  .link {
    border-radius: 50%;
    display: block;
    width: 42px;
    height: 42px;
    text-align: center;
    line-height: 42px;
    font-size: 16px;
    color: $black;
    font-weight: $Bold;
    border-bottom: none;
    background-color: $color1;
  }
  .active .link {
    background-color: darken($color1, 25%);
  }
  .arrow .link {
    position: relative;
  }
  .image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
  }
`
