import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FaFacebookMessenger } from 'react-icons/fa';
import { Input } from 'antd';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Send } from 'react-feather';
import ROUTES, { RenderRoutes } from '../RenderRoutes/RenderRoutes';
import socketIOClient from 'socket.io-client';

import Wrapper from './Main.styled';
import { getAllUsers } from '../../actions';

import Icon from '../Topics/Item/Icon';

const socket = socketIOClient('http://localhost:5000/');

const Main = ({ getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [listMessenger, setListMessenger] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = useCallback(
    event => {
      if (event.keyCode === 13) {
        socket.emit('Client-send-data', inputValue);
        setInputValue('');
      }
    },
    [inputValue],
  );

  useEffect(() => {
    document.addEventListener('keydown', sendMessage);

    return () => document.removeEventListener('keydown', sendMessage);
  }, [sendMessage]);

  useEffect(() => {
    socket.on('Sever-send-data', data => {
      setListMessenger([...listMessenger, data]);
    });

    return () => {
      socket.off('Sever-send-data');
    };
  }, [listMessenger]);

  useEffect(() => {
    const ele = document.querySelector("[id='test-scrollbar-style']");
    ele && ele.scrollTo({ top: 99999999999999999999999 });
  }, [listMessenger.length]);

  const sendMessenger = useCallback(() => {
    socket.emit('Client-send-data', inputValue);
    setInputValue('');
  }, [inputValue]);

  return (
    <Wrapper>
      <>
        <RenderRoutes routes={ROUTES} />
        <FaFacebookMessenger id="popover-chat-real-time" className="icon-chat" />
        <Popover
          placement="top-end"
          isOpen={popoverOpen}
          target="popover-chat-real-time"
          toggle={() => setPopoverOpen(!popoverOpen)}
        >
          <PopoverBody>
            <div id="test-scrollbar-style" style={{ paddingRight: 12 }} className="content-chat">
              {!!listMessenger.length &&
                listMessenger.map((item, index) => (
                  <div
                    style={index === listMessenger.length - 1 ? { marginBottom: 10 } : {}}
                    className={`messenger ${item.target === 'you' ? 'your-messenger' : 'some-body-messenger'}`}
                    key={index}
                  >
                    <span className="title">{item.target === 'you' ? 'Bạn' : 'Học Viên Khác'}</span>
                    <span className="content">{item.messenger}</span>
                  </div>
                ))}
            </div>
            <div className="input-chat" style={{ marginRight: 19 }}>
              <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
              <Icon addEmoji={item => setInputValue(`${inputValue}${item}`)} idPopoverLegacy="icon-chat-real-time" />
              <Send size="35" color="blue" onClick={sendMessenger} />
            </div>
          </PopoverBody>
        </Popover>
      </>
    </Wrapper>
  );
};

const mapStatetoProps = () => {
  return {};
};

export default connect(mapStatetoProps, { getAllUsers })(Main);
