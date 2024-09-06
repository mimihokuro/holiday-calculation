import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { RepeatIcon, CheckIcon } from "@chakra-ui/icons";

const ExecuteButton = ({ buttonFunc }) => {
  const { calculateDays, resetCalculateDays } = buttonFunc;
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
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
    </Box>
  );
};

export default ExecuteButton;
