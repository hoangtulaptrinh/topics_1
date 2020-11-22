import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FaFacebookMessenger } from 'react-icons/fa';
import { Popover, PopoverHeader, PopoverBody, Input } from 'reactstrap';
import { Send } from 'react-feather';
import ROUTES, { RenderRoutes } from '../RenderRoutes/RenderRoutes';
import socketIOClient from 'socket.io-client';

import Wrapper from './Main.styled';
import { getAllUsers } from '../../actions';

const socket = socketIOClient('http://localhost:8080/');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('Sever-send-data', data => {
      console.log(data);
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
        <FaFacebookMessenger id="Popover1" className="icon-chat" />
        <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={() => setPopoverOpen(!popoverOpen)}>
          <PopoverHeader>Chat Box</PopoverHeader>
          <PopoverBody>
            <div id="test-scrollbar-style" className="content-chat">
              {!!listMessenger.length &&
                listMessenger.map((item, index) => (
                  <div
                    className={`messenger ${item.target === 'you' ? 'your-messenger' : 'some-body-messenger'}`}
                    key={index}
                  >
                    <span className="title">{item.target === 'you' ? 'You' : 'Some Body'}</span>
                    <span className="content">{item.messenger}</span>
                  </div>
                ))}
            </div>
            <div className="input-chat">
              <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
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
