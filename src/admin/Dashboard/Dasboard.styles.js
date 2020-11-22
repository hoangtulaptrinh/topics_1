import styled from 'styled-components';

export default styled.div`
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }
    
    .trigger:hover {
        color: #1890ff;
    } 
    
    .site-layout .site-layout-background {
        background: #fff;
    }

    .header-right {     
        float: right;    
        display: inline-block;
        margin-right: 20px;
        height: 100%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        min-width: 10%;
    }

    .header-left {
        float: right;    
        display: inline-block;
        margin-right: 30px; 
        width: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        cursor: pointer;
    }

    .header-right:hover {
        background-color: rgba(0, 0, 0, 0.025);
    }

    .header-left:hover {
        background-color: rgba(0, 0, 0, 0.025);
    }
`;

export const LogoWrapper = styled.div`    
    .logo {               
        height: 40px;
        width: 40px;    
        background: rgba(255, 255, 255, 0.2);
        margin: 0px 0px 16px 0px;
        cursor: pointer;    
        margin-bottom: 0px;        
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url('../../images/logo3.png');        
    }    
`;