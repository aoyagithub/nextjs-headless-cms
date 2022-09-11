import css from 'styled-jsx/css'

export default css`
  @import '../../styles/variable';
  .sidebar {
    border-radius: 20px;
    background-color: #f7f7f7;
    margin-bottom: 30px;
  }
  .sidebar-heading {
    text-align: center;
    line-height: 1.27;
    font-size: 22px;
    font-weight: $Bold;
    padding: 14px 0;
    border-bottom: 1px solid lighten($border1, 4%);
  }
  .sidebar-list-item {
    & + .sidebar-list-item {
      border-top: 1px solid lighten($border1, 4%);
    }
  }
  .sidebar-list-link {
    color: $black;
    padding: 20px;
    display: block;
    font-size: 15px;
    line-height: 1.6;
    font-weight: $Bold;
    border-bottom: none;
    &:hover {
      border-bottom: none;
    }
  }
`
