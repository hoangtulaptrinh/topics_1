import styled from 'styled-components';

export default styled.div`
  width: 300px;

  position: fixed;
  margin-right: 1000px;

  .header {
    margin: 15px;
    font-size: 15px;
    img {
      max-height: 50px;
    }
    .left-info {
      margin: 5px;
    }
    .right-info {
      margin-left: 10px;
    }
  }

  .title {
    font-weight: bold;
    color: #393e41;
  }

  .progress-course {
    margin-top: 20px;
    padding: 15px;
    background: #fff;
    height: 300px;
    border: 1px solid #e7e9ec;
    border-radius: 4px;

    .course {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-top: 1px solid #e7e9ec;

      .is-completed {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 22px;
        width: 22px;
        border: 2px solid #d0d3d6;
        border-radius: 50%;
      }

      .course-name {
        font-size: 15px;
        color: #ff865a;
      }

      .completed-status {
        display: flex;
        justify-content: center;
        height: 22px;
        width: 40px;
        border: 1px solid #f78f02;
        color: #f78f02;
        border-radius: 30px;
      }
    }
  }

  .user-buy-course {
    overflow: auto;
    margin-top: 20px;
    padding: 15px;
    background: #fff;
    height: 400px;
    border: 1px solid #e7e9ec;
    border-radius: 4px;
  }

  .user-buy-course::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: rgb(98, 100, 100);
  }
  .user-buy-course::-webkit-scrollbar {
    width: 7px;
    background-color: rgba(45, 47, 52, 0.7);
  }
  .user-buy-course::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(80, 81, 83, 0.7);
  }
  .user-buy-course::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.7);
  }
  .user-buy-course::-webkit-scrollbar {
    background-color: rgba(255, 255, 255, 0.7);
  }
  .user-buy-course::-webkit-scrollbar-thumb {
    background-color: rgba(195, 194, 194, 0.7);
  }
`;
