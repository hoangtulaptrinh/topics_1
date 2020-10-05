import styled from 'styled-components';

export default styled.div`
  width: 300px;

  position: fixed;
  margin-left: 1000px;

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
    margin-top: 20px;
    padding: 15px;
    background: #fff;
    height: 400px;
    border: 1px solid #e7e9ec;
    border-radius: 4px;
  }
`;
