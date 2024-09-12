import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { TimeIcon } from "@chakra-ui/icons";

const Body = ({ tasks, openEditModal, handleDeleteTask }) => {
  return (
    <Box w={"100%"}>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Task List</TableCaption>
          <Thead>
            <Tr>
              <Th>Task Name</Th>
              <Th>Scheduled Time</Th>
              <Th>Status</Th>
              <Th>Edit</Th>
              <Th>Delete</Th> {/* New Delete column */}
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((item) => (
              <Tr key={item._id}>
                <Td fontWeight={"bold"}>{item.name}</Td>
                <Td
                  fontWeight={"semibold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <TimeIcon mr={2} />
                  {new Date(item.whenToSend).toLocaleDateString("en-GB")}
                </Td>
                <Td textTransform={"capitalize"}>
                  {item.status.toString() === "true" ? "Active" : "Inactive"}
                </Td>
                <Td>
                  <Button
                    colorScheme="yellow"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteTask(item._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Body;
