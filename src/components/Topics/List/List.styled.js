import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-around;

  .total {
    margin-top: 80px;
    width: 1500px;

    display: flex;
    justify-content: center;

    .list-topics {
      width: 650px;
      padding: 20px;
    }
  }

  .header {
    display: flex;
    align-items: center;
    height: 43px;
    font-weight: 500;

    img {
      max-height: 36px;
      border-radius: 50%;
    }

    .info {
      color: #393e41;

      .left-info {
        margin-left: 10px;

        span {
          margin-left: 5px;
          color: #7f868f;
        }
      }

      .left-info:first-letter {
        text-transform: capitalize;
      }

      .right-info {
        span {
          margin-left: 10px;
        }

        .role {
          margin-left: -5px;
        }
      }
    }
  }

  .new-thread {
    background: #fff;
    height: 220px;
    margin-bottom: 20px;
    padding: 10px 15px;
    border: solid 1px #e7e9ec;
    border-radius: 4px;

    .title {
      font-weight: bold;
      color: cornflowerblue;
    }

    .header {
      margin-top: 20px;
    }

    img {
      margin-right: 10px;
    }

    .info {
      margin-top: 30px;
      width: 573px;

      .right-info {
        margin-top: 20px;
        height: 100px;

        textarea {
          resize: none;
          background: 0 0;
          box-shadow: none;
          color: #555;
          font-family: inherit;
          font-size: 100%;
          margin: 0;
          outline: 0;
          width: 100%;
          border-radius: 3px;
          border: 1px solid #ccc;
        }

        .submit-comment {
          margin-top: 10px;

          button {
            cursor: pointer;
            outline: none;
            color: #fff;
            border-radius: 20px;
            padding: 10px 20px;
            min-height: 10px;
            font-size: 14px;
            font-weight: bold;
          }

          .post {
            background: #ff865a;
          }

          .cancel {
            margin-left: 20px;
            background: #a5a3a0;
          }
        }
      }
      .upload {
        width: 180px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        font-size: 22px;
        color: #ff865a;

        .wrapper-field-upload {
          label {
            cursor: pointer;
          }

          input {
            display: none;
          }
        }
        span {
          margin: 0;
        }

        svg {
          cursor: pointer;
        }
      }
    }
  }
`;
