import styled from 'styled-components';

import BG_FHD from '../../../assets/img/BG_FHD.jpg';

export default styled.div`
  .top-page {
    height: 100vh;
    width: 100vw;
    background: url(${BG_FHD}) no-repeat center;
    display: flex;
    align-items: center;

    .intro {
      margin-left: 100px;
      color: white;
      font-weight: bold;

      .intro-1 {
        margin: 0;
        font-size: 22px;
      }

      .intro-2 {
        font-size: 40px;
      }

      button {
        color: white;
        padding: 12px 30px;
        background: #f05123;
        font-size: 16px;
        border-radius: 36px;
        font-weight: bold;
        outline: none;
        border: none;
      }
    }
  }

  .center-page {
    .info {
      margin: 100px 0;
      display: flex;
      justify-content: space-evenly;
      .info__item {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          height: 100px;
        }
      }
    }

    .top-courses {
      .title {
        margin-bottom: 100px;
        color: #000000;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: center;

        .title-1 {
          margin: 0;
          font-size: 35px;
        }

        .title-2 {
          font-size: 15px;
        }
      }

      .courses {
        margin-bottom: 100px;
        display: flex;
        justify-content: space-evenly;
      }
    }
  }
`;
