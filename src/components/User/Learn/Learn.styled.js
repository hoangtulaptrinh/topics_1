import styled from 'styled-components';

export default styled.div`
  .total-learn {
    margin-top: 100px;
    display: flex;

    .left {
      flex: 7;

      .video-custom {
        height: 500px;

        video {
        }
      }

      video {
        max-width: 100%;
      }
    }

    .right {
      flex: 3;

      .learn-collapse {
        p {
          display: flex;
          align-items: center;
        }

        svg {
          margin-left: 5px;
          font-size: 25px;
        }

        .play-video-icon {
          color: #6098ff;
        }

        .ant-collapse {
          border: 1px solid #79797996;
          border-bottom: none;

          .ant-collapse-item {
            border-bottom: 1px solid #79797996;
          }
        }
      }

      .go-to-forum {
        color: #ff6a00;
        cursor: pointer;
        padding: 12px 16px;
        border-bottom: solid 1px rgb(217, 217, 217, 1);
      }
    }
  }
`;
