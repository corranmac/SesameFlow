import MenuToggle from "./toggle"
import React from "react"
import Logo from "./logo"
import {Text, Flex, Box, Stack} from "@chakra-ui/react"
import { Outlet, Link } from "react-router-dom";


const MenuLinks = ({ isOpen }) => {
  return (
      <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
      >
          <Stack
              spacing={50}
              align="center"
              justify={["center", "space-between", "flex-end", "flex-end"]}
              direction={["column", "row", "row", "row"]}
              pt={[4, 4, 0, 0]}
              gap={50}
          >
              <Link to="/">Home</Link>
              <Link to="/flow">Flow</Link>
              <Link to="/tester">Data</Link>
          </Stack>
      </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
    return (
      <Flex
        as="nav"
        align="center"
        wrap="wrap"
        w="100%"
        p={8}
        bg={["secondary-100", "secondary-100", "primary-100", "primary-100"]}
        color={["primary-100", "primary-100", "secondary-100", "secondary-100"]}
        {...props}
      >
        {children}
      </Flex>
    )
  }

  const NavBar = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <NavBarContainer {...props}>
                <Logo w="200px" color={["primary-100", "primary-100", "secondary-100", "secondary-100"]} />
                <MenuToggle toggle={toggle} isOpen={isOpen} />
                <MenuLinks isOpen={isOpen} />
            </NavBarContainer>
            <Outlet />
        </div>
    );
};

  export default NavBar;