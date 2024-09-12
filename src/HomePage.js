import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  useDisclosure,
  VStack,
  Text,
} from "@chakra-ui/react";
import Header from "./component/Header";
import Body from "./component/Body";

const HomePage = () => {
  return (
    <Box>
      <Header />
      {/* <Body /> */}
    </Box>
  );
};

export default HomePage;
