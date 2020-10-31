import styled from 'styled-components';

export default styled.div`
  .total-detail {
    margin-top: 70px;
    display: flex;

    .left {
      margin-left: 50px;
      flex: 7;

      .intro {
        margin-bottom: 50px;
        font-size: 15px;
      }

      .content {
        display: flex;
        flex-wrap: wrap;

        .content__item {
          display: flex;
          align-items: center;
          width: 45%;
          margin-bottom: 20px;

          svg {
            color: #f05123;
            margin-right: 10px;
          }
        }
      }

      .video {
        padding: 10px 30px;
        border: solid 1px rgba(0, 0, 0, 0.05);
        border-top: none;
        display: flex;
        justify-content: space-between;
        background: #f5f4f2;

        .video__left {
          margin-left: 10px;
        }

        .video__right {
          width: 300px;
          display: flex;
          justify-content: space-between;
        }
      }
      .video.title {
        border: solid 1px rgba(240, 81, 35, 0.15);
        background: #f4f4f4;

        .video__left {
          margin-left: 0;
          font-weight: 500;
        }

        .video__right {
          span:first-child {
            padding-left: 50px;
          }
        }
      }
    }
    .right {
      margin: 50px;
      flex: 3;

      img {
        width: 100%;
      }

      .right__info {
        padding: 30px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -4px;
        background: #f5f5f5;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);

        .has-course {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 30px;
        }

        button {
          cursor: pointer;
          color: white;
          padding: 12px 30px;
          background: #f05123;
          font-size: 16px;
          border-radius: 36px;
          font-weight: bold;
          outline: none;
          border: none;
        }

        .detail {
          color: #494949;
          font-size: 15px;
          font-weight: 400;

          .info {
            margin-top: 15px;
            .content {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
`;
