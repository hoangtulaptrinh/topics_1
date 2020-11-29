import React from 'react';
import map from 'lodash/map';
import { PopoverBody, Row, Col, UncontrolledPopover } from 'reactstrap';
import { FaRegSmileWink } from 'react-icons/fa';

import './Icon.css';

const EMOJI =
  '😀😃😄😁😆😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🤩🥳😏😒😞😫😩🥺😢😭😤😠😡🤬🤯🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐮🐷🐽🐸🐵🙈🙉🙊🐒🐔🐧🐦🐤🐣🐥🐙🦕🦎🐍🐢🐌🐝🌑🌘🌘🌗🌗⚽🏀🏈⚾🥎🎾🏐🏉🥏🎱🏓🏸🏒🏑🥍🏏🥅⛳';

const Icon = ({ addEmoji, idPopoverLegacy }) => {
  return (
    <div className="IconPopover">
      <div id={idPopoverLegacy}>
        <FaRegSmileWink />
      </div>
      <UncontrolledPopover
        className="All-Popover"
        trigger="legacy"
        placement="top"
        target={idPopoverLegacy}
        hideArrow={true}
      >
        <PopoverBody id="scroll-body-icon" className="PopoverBody">
          <Row>
            {map(Array.from(EMOJI), (item, index) => (
              <Col sm="2" key={index}>
                <p className="p-icon" onClick={() => addEmoji(item)}>
                  {item}
                </p>
              </Col>
            ))}
          </Row>
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
};

export default Icon;
