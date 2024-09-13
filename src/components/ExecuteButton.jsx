import { Button, ButtonGroup, HStack } from "@chakra-ui/react";
import { RepeatIcon, CheckIcon } from "@chakra-ui/icons";

const ExecuteButton = ({ buttonFunc }) => {
  const { calculateDays, resetCalculateDays } = buttonFunc;
  return (
    <HStack placeContent="center" placeItems="center">
      <ButtonGroup spacing={4} mt={4}>
        <Button
          rightIcon={<CheckIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={calculateDays}
        >
          計算する
        </Button>
        <Button
          rightIcon={<RepeatIcon />}
          colorScheme="teal"
          variant="outline"
          onClick={resetCalculateDays}
        >
          リセット
        </Button>
      </ButtonGroup>
    </HStack>
  );
};

export default ExecuteButton;
