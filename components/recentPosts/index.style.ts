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
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    font-weight: $Bold;
    line-height: 1.6;
    border-bottom: none;
    &:hover {
      border-bottom: none;
    }
  }
  .sidebar-list-image {
    width: 100px;
    height: 100px;
    border-radius: 20px;
  }
  .sidebar-list-text {
    width: calc(100% - calc(100px + 20px));
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
`
