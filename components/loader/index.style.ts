import css from 'styled-jsx/css'

export default css`
  @import '../../styles/variable';

  .loader {
    position: relative;
    padding-top: 20px;
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .loading-bar {
    display: inline-block;
    width: 4px;
    height: 18px;
    border-radius: 4px;
    animation: loading 1s ease-in-out infinite;
    background-color: $color2;
  }
  .loading-bar:nth-child(1) {
    animation-delay: 0;
  }
  .loading-bar:nth-child(2) {
    animation-delay: 0.09s;
  }
  .loading-bar:nth-child(3) {
    animation-delay: 0.18s;
  }
  .loading-bar:nth-child(4) {
    animation-delay: 0.27s;
  }

  @keyframes loading {
    0% {
      transform: scale(1);
    }
    20% {
      transform: scale(1, 2.2);
    }
    40% {
      transform: scale(1);
    }
  }
`
