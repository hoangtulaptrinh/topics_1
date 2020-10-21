import styled from 'styled-components';

export default styled.div`
  .total-courses {
    margin-top: 150px;
    display: flex;

    .left {
      margin-left: 50px;
      width: 300px;

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
`;
