import React, { useState, useEffect } from "react";
import { Box, Button, VStack, Heading, Text, Link, useToast, Progress } from "@chakra-ui/react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const tasks = [
  {
    title: "Pre-Marathon Preparation (Day 0)",
    subtasks: [
      {
        name: "Setup and Planning",
        duration: 120,
        resource: "https://towardsdatascience.com/rasa",
      },
      {
        name: "Preliminary Data Organization",
        duration: 120,
        resource: "https://towardsdatascience.com/rasa",
      },
      {
        name: "Team Briefing",
        duration: 60,
        resource: "https://your-company-resources.com/team-briefing",
      },
    ],
  },
  // ... Add other Marathon Sessions and their subtasks here
];

const Index = () => {
  const toast = useToast();
  const [timers, setTimers] = useState(
    tasks.map((session) =>
      session.subtasks.map(() => ({
        timeSpent: 0,
        isActive: false,
      })),
    ),
  );

  // Handle timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((timers) =>
        timers.map((session) =>
          session.map((timer) => {
            if (!timer.isActive) return timer;
            const newTimeSpent = timer.timeSpent + 1;
            return { ...timer, timeSpent: newTimeSpent };
          }),
        ),
      );
    }, 60000); // each tick represents 1 minute
    return () => clearInterval(interval);
  }, []);

  // Play bell at 25%, 50%, 100%
  useEffect(() => {
    timers.forEach((session, sessionIndex) => {
      session.forEach((timer, timerIndex) => {
        const taskDuration = tasks[sessionIndex].subtasks[timerIndex].duration;
        const percentages = [25, 50, 100];
        const timeSpent = timer.timeSpent;
        percentages.forEach((percentage) => {
          if (timeSpent === (taskDuration * percentage) / 100) {
            toast({
              title: `Bell: ${percentages} % Completed`,
              status: "info",
              duration: 2000,
              isClosable: true,
            });
          }
        });
      });
    });
  }, [timers, toast]);

  // Start, pause, and reset timer
  const handleTimerControl = (sessionIndex, timerIndex, action) => {
    setTimers((timers) =>
      timers.map((session, sIndex) =>
        session.map((timer, tIndex) => {
          if (sIndex === sessionIndex && tIndex === timerIndex) {
            if (action === "start") {
              return { ...timer, isActive: true };
            } else if (action === "pause") {
              return { ...timer, isActive: false };
            } else if (action === "reset") {
              return { timeSpent: 0, isActive: false };
            }
          }
          return timer;
        }),
      ),
    );
  };

  return (
    <VStack spacing={8} p={5}>
      {tasks.map((session, sessionIndex) => (
        <Box key={session.title} w="full">
          <Heading size="md">{session.title}</Heading>
          {session.subtasks.map((subtask, timerIndex) => {
            const timer = timers[sessionIndex][timerIndex];
            const isCompleted = timer.timeSpent >= subtask.duration;
            const percentage = (timer.timeSpent / subtask.duration) * 100;

            return (
              <Box key={subtask.name} p={5} borderWidth="1px" borderRadius="lg">
                <Heading size="sm">{subtask.name}</Heading>
                <Text mb={2}>Duration: {subtask.duration} minutes</Text>
                <Link href={subtask.resource} isExternal>
                  Resource Link
                </Link>
                <Progress mt={2} value={percentage} />
                <Box mt={2}>
                  <Button leftIcon={<FaPlay />} onClick={() => handleTimerControl(sessionIndex, timerIndex, "start")} isDisabled={timer.isActive || isCompleted} mr={2}>
                    Start
                  </Button>
                  <Button leftIcon={<FaPause />} onClick={() => handleTimerControl(sessionIndex, timerIndex, "pause")} isDisabled={!timer.isActive} mr={2}>
                    Pause
                  </Button>
                  <Button leftIcon={<FaRedo />} onClick={() => handleTimerControl(sessionIndex, timerIndex, "reset")}>
                    Reset
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      ))}
    </VStack>
  );
};

export default Index;
