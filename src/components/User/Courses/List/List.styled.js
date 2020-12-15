import styled from 'styled-components';

export default styled.div`
  .total-courses {
    margin-top: 150px;
    display: flex;

    .left {
      display: flex;
      flex-direction: column;

      margin-left: 20px;
      width: 200px;

      p {
        font-size: 16px;
        font-weight: bold;
      }

      .category {
        cursor: pointer;
        padding: 10px 10px 10px 25px;
        display: flex;
        align-items: center;
        font-size: 15px;
        border: 1px solid rgba(0, 0, 0, 0.05);
      }

      .category-select {
        background: #79c9f7;
      }

      .category:first-letter {
        text-transform: capitalize;
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }

    .right > div {
      margin: 1.5%;
      width: 22%;
    }
  }

  .search-wrapper {
    margin-bottom: 30px;

    input {
      width: 450px;
      padding: 5px;
      margin: 15px 15px 15px 0;
      height: 25px;
      outline: none;
    }
    .search-circle {
      border: 4px inside #080;
      border-color: #439bc6;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      box-shadow: 3px 2px 2px rgba(21, 153, 219, 0.5);
      transition: all 1s ease;
      float: left;
      color: gray;
    }
    .search-circle:hover,
    .search-circle:focus {
      width: 70%;
      border-radius: 3%;
    }
    .search-bar {
      position: relative;
      float: left;
      border-left: 3px solid #000;
      border-right: 2px solid #ddd;
      height: 45px;
      background: #ddd;
      left: 0.5%;
      top: 65px;
      transform: rotate(-45deg);
      box-shadow: 0 1px 2px 1px rgba(239, 33, 85, 0.5);
    }
  }
`;
