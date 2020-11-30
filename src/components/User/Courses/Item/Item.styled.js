import styled from 'styled-components';

export default styled.div`
  width: 20%;

  img {
    border: 1px solid #e7e9ec;
    cursor: pointer;
    width: 100%;
    height: 200px;
  }

  .course {
    margin-top: -4px;
    border: 1px solid #e7e9ec;
    padding: 12px;

    .course__name {
      margin: 0;
      font-weight: bold;
      font-size: 18px;
      color: #464646;
    }

    .course__intro {
      font-weight: 300;
      font-size: 14px;
      color: #000000;
    }

    .course__more-info {
      display: flex;
      justify-content: space-between;

      .item {
        font-size: 20px;
        display: flex;
        align-items: center;

        svg {
          margin: 0 0 -5px 5px;
        }
      }

      .item.cost {
        svg {
          color: #83858a;
        }
      }
    }
  }
`;
