import styled from 'styled-components';

export default styled.div`
  position: fixed;
  top: 30px;
  left: 50px;
  right: 50px;
  width: 100%;
  display: flex;

  .left {
    flex: 3.5;
    display: flex;
    img {
      cursor: pointer;
      width: 170px;
    }
    .nav-bar {
      margin-left: 30px;
      flex: 1;
      display: flex;
      justify-content: space-between;

      .nav-bar__item {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin: 0;
        font-size: 20px;
        font-weight: bold;
        color: white;
        text-transform: uppercase;
      }
    }
  }

  .right {
    flex: 6.5;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    padding-right: 100px;
    .header {
      display: flex;
      align-items: center;
      margin: 15px;
      font-size: 15px;

      img {
        background-size: cover;
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }

      .info {
        padding: 0 17px 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-right: solid 1px #e7e9ec;
        .info__name {
          margin: 0;
          font-size: 18px;
          color: white;
          font-weight: bold;
        }

        .info__coin {
          margin: 0;
          font-size: 14px;
          color: yellow;
          font-weight: bold;
        }
      }
    }
    .menu {
      width: 120px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        cursor: pointer;
        font-size: 30px;
        color: white;
        outline: none;
      }
    }
  }
`;
