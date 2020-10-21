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
        border-bottom: solid 1px rgba(0, 0, 0, 0.05);
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
      margin-right: 50px;
      flex: 3;
    }
  }
`;
