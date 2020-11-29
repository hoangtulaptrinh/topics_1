import styled from 'styled-components';

export default styled.div`
  .container {
    display: flex;
    justify-content: center;

    .total {
      margin-top: 100px;
      width: 1200px;
      display: flex;

      .left {
        flex: 3.3;

        .header {
          margin: 15px;
          display: flex;
          font-size: 15px;

          img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
          }

          .info {
            height: 64px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 20px;

            .info__name {
              color: #009090;
              font-size: 18px;
              display: inline-block;
              margin: 0 8px 0 0;
              transition: color 0.15s cubic-bezier(0.2, 0.2, 0.2, 1);
              width: 100%;
              font-weight: bold;
            }

            .info__coin {
              color: #fff;
              margin-top: 4px;
              margin-bottom: 4px;
              background: #999;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 3px;
              padding: 0 8px;
              font-size: 11px;
              font-weight: 700;
              height: 20px;
              box-sizing: border-box;
              text-decoration: none;
              white-space: nowrap;
              text-transform: uppercase;
            }
          }
        }
      }

      .right {
        flex: 6.7;

        .header {
          margin: 15px 15px 15px 0;
          display: flex;
          font-size: 15px;

          img {
            width: 50px;
            height: 50px;
          }

          .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 20px;

            .title {
              font-weight: 500;
              margin-bottom: 16px;
              font-size: 45px;
              line-height: 48px;
              margin: 0 0 24px;
            }

            .content {
              max-width: 500px;
              font-size: 14px;
              line-height: 20px;
              font-weight: 400;
              margin: 0 0 12px 5px;
            }
          }
        }

        h4 {
          margin: 6px 0;
          font-size: 18px;
          font-weight: 600;
        }

        .item {
          cursor: pointer;
          max-width: 550px;
          padding: 15px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: none;
          border-bottom: 1px solid #e5e5e5;
          border-top: 1px solid #e5e5e5;
          transition: background-color 0.15s cubic-bezier(0.2, 0.2, 0.2, 1);
          width: 100%;

          .left {
            .top {
              font-size: 22px;
              line-height: 22px;
              font-weight: 400;
              color: #333;
              display: block;
            }

            .down {
              display: inline-block;
              margin-top: 12px;
              font-size: 14px;
              font-weight: 400;
              color: #009090;
            }
          }

          svg {
            font-size: 20px;
            align-self: center;
            color: #009090;
            margin-left: 4px;
          }
        }

        .user-info {
          margin-top: 40px;
        }

        .back-btn {
          cursor: pointer;
          display: flex;
          color: #009090;
          font-size: 16px;
          height: 52px;
          position: relative;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 40px;
          padding-left: 20px;
          padding-right: 20px;
          margin-right: -20px;
          margin-left: -20px;

          span {
            margin: 0 0 2px 5px;
          }
        }

        form {
          margin-bottom: 50px;
        }

        .field {
          margin-top: 30px;

          .title {
            margin-bottom: 15px;
            display: block;
            font-size: 14px;
            color: #333333;
            font-weight: 700;
            padding-bottom: 6px;
            line-height: 18px;
          }

          .input {
            outline: none;
            height: 40px;
            max-width: 575px;
            padding: 8px 12px;
            appearance: none;
            background-color: #ffffff;
            border: 1px solid #b3b3b3;
            border-radius: 3px;
            font-family: inherit;
            transition: background-color 0.15s cubic-bezier(0.2, 0.2, 0.2, 1),
              border-color 0.15s cubic-bezier(0.2, 0.2, 0.2, 1);
            width: 100%;
          }
        }

        .has-error {
          border: 1px solid red !important;
        }

        .submit-btn {
          margin-top: 50px;
          cursor: pointer;
          padding: 8px 16px;
          height: 40px;
          outline: none;
          border: none;
          border-radius: 5px;
          background: #1ec0b0;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
        }

        .disabled-btn {
          background: #8edfd7;
        }
      }
    }
  }
`;
