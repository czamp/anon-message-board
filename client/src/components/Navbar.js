import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Button } from "semantic-ui-react";

const Navbar = () => (
  <Menu color="blue" inverted secondary>
    <Menu.Item>
      <Menu.Header as="h3">Anon Messageboards</Menu.Header>
    </Menu.Item>
    <Menu.Menu>
      <Menu.Item>
        <Link to="/">Home</Link>
      </Menu.Item>
    </Menu.Menu>
    <Menu.Menu position="right">
      <Menu.Item link>
        <a href="https://github.com/czamp/anon-message-board" target="_blank" rel="noopener noreferrer">
          <Button icon inverted>
            <Icon name="github" />
            {' '}See The Source Code
          </Button>
        </a>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default Navbar;
