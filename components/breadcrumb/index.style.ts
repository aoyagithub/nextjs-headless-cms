import css from 'styled-jsx/css'

export default css`
  @import '../../styles/variable';
  .breadcrumb {
    display: flex;
    font-weight: $Bold;
    font-size: 15px;
    color: $black;
    flex-wrap: wrap;
  }
  .breadcrumb-link {
    color: $black;
  }
  .breadcrumb-item-hasLink {
    margin-right: 16px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      background-image: url('/images/breadcrumb.svg');
      background-repeat: no-repeat;
      width: 4px;
      height: 7px;
      display: inline-block;
      top: 50%;
      transform: translateY(-50%);
      right: -10px;
    }
  }
`
