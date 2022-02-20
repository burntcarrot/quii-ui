import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { FcPlanner, FcSerialTasks, FcTodoList } from "react-icons/fc";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="gray.100"
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color="gray.600">{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcSerialTasks} w={10} h={10} />}
          title="Zero-clutter UI"
          text="Most task management tools are cluttered. quii isn't. quii keeps the UI spacious and easy to interact with."
        />
        <Feature
          icon={<Icon as={FcPlanner} w={10} h={10} />}
          title="Fluid management"
          text="Too much distraction due to details? quii makes it easier to handle tasks."
        />
        <Feature
          icon={<Icon as={FcTodoList} w={10} h={10} />}
          title="Friction-less task management"
          text="Task management with minimalism. Create tasks with ease."
        />
      </SimpleGrid>
    </Box>
  );
}
