import styled from 'styled-components';

export default styled.div`
  .total-learn {
    margin-top: 100px;
    display: flex;

    .left {
      flex: 7;

      video {
        width: 100%;
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
      }
    }
  }
`;
