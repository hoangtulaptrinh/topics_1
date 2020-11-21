import styled from 'styled-components';

export default styled.div`
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  padding: 15px;

  border: 1px solid #e7e9ec;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 6px 24px 0 transparent;

  p {
    margin: 0;
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

  .content {
    p {
      margin: 10px 0;
      color: #393e41;
    }

    img {
      width: 100%;
    }

    video {
      margin-top: 20px;
      width: 100%;
    }

    .download {
      margin: 15px 0;
      span {
        font-size: 20px;
        margin-right: 10px;
        color: #05c5ff;
      }

      a {
        text-decoration: none;
        color: #05c5ff;
      }
    }
  }

  .write-comment {
    border-top: 1px solid #e7e9ec;
    height: 170px;

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

  .action {
    margin: 10px 0;
    display: flex;

    .action-care,
    .action-comment {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-right: 30px;
      span {
        margin-top: 3px;
        color: #ff865a;
        font-size: 20px;
        margin-right: 10px;
      }
    }

    .action-care:hover,
    .action-comment:hover {
      color: #e36436;
      span {
        color: #e36436;
      }
    }
  }

  .comment {
    overflow: auto;
    max-height: 500px;
    background: #fbfbfc;
    margin: 0 -15px;
    padding: 0 15px 0;
    border-radius: 0 0 4px 4px;

    .content {
      margin-left: 40px;
    }

    .header {
      margin-top: 20px;
    }
  }

  #id-comment {
    border-top: 1px solid rgb(231, 233, 236) !important;
  }

  #id-comment::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: rgb(98, 100, 100);
  }
  #id-comment::-webkit-scrollbar {
    width: 7px;
    background-color: rgba(45, 47, 52, 0.7);
  }
  #id-comment::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(80, 81, 83, 0.7);
  }
  #id-comment::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.7);
  }
  #id-comment::-webkit-scrollbar {
    background-color: rgba(255, 255, 255, 0.7);
  }
  #id-comment::-webkit-scrollbar-thumb {
    background-color: rgba(195, 194, 194, 0.7);
  }
`;
