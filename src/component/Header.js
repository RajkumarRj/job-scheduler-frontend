import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Body from "./Body";

const Header = () => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const toast = useToast();

  // Fetch tasks function
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/task/all");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Call fetchTasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete task function
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/${taskId}`);
      toast({
        title: "Task deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchTasks(); // Refetch tasks after deletion
    } catch (error) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !date || status === "") {
      toast({
        title: "Please fill out all fields correctly.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      if (!isEditing) {
        await axios.post("/api/task/newtask", {
          name,
          email,
          date,
          status: status === "true",
        });

        toast({
          title: "Task created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await axios.put(`/api/task/${selectedTask._id}`, {
          name,
          email,
          date,

          status: status === "true",
        });

        toast({
          title: "Task updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      fetchTasks();
      onClose();
      resetForm();
    } catch (error) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setDate("");
    setStatus("");
    setIsEditing(false);
    setSelectedTask(null);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setName(task.name);
    setEmail(task.email);
    setDate(task.whenToSend);
    setStatus(task.status.toString());
    setIsEditing(true);
    onOpen();
  };

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        bg={"white"}
        w={"100%"}
        p={"5px 10px 5px 10px"}
        borderWidth={"5px"}
      >
        <Text fontSize={"2xl"}>TO-DO-APP</Text>

        <Box>
          <Button onClick={onOpen}>Create +</Button>

          <Modal
            isOpen={isOpen}
            onClose={() => {
              onClose();
              resetForm();
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {isEditing ? "Edit Task" : "Create New Task"}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack>
                  <FormControl isRequired>
                    <FormLabel>Task Name</FormLabel>
                    <Input
                      placeholder="Enter the name of the task"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="Enter your Email.."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Notify Time</FormLabel>
                    <Input
                      type="datetime-local"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Status</FormLabel>
                    <RadioGroup value={status} onChange={setStatus}>
                      <Radio mr={3} value={"true"} colorScheme="green">
                        Active
                      </Radio>
                      <Radio colorScheme="red" value={"false"}>
                        Inactive
                      </Radio>
                    </RadioGroup>
                  </FormControl>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                  {isEditing ? "Update" : "Create"}
                </Button>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>

      <Body
        tasks={tasks}
        openEditModal={openEditModal}
        handleDeleteTask={handleDeleteTask}
      />
    </Box>
  );
};

export default Header;
