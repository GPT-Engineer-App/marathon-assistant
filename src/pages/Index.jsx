import React, { useState, useEffect } from "react";
import { Box, Button, VStack, Heading, Text, Link, useToast, Progress } from "@chakra-ui/react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const tasks = [
  {
    title: "Preparation (Day 0)",
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
  {
    title: "Session 1: Foundation and Initial Development (Day 1)",
    subtasks: [
      {
        name: "NLU Training Data Creation",
        duration: 180,
        resource: "https://rasa.com/docs/rasa/playground",
      },
      {
        name: "Custom Actions and API Development",
        duration: 180,
        resource: "https://rasa.com/docs/action-server/sdk-actions",
      },
      {
        name: "Dialogue Management and Basic Model Training",
        duration: 180,
        resource: "https://www.udemy.com/course/rasa-for-beginners",
      },
    ],
  },
  {
    title: "Session 2: Advanced Features and Integration (Day 2)",
    subtasks: [
      {
        name: "Advanced Custom Actions",
        duration: 240,
        resource: "https://forum.rasa.com",
      },
      {
        name: "Integration and Enhanced Dialogue Management",
        duration: 300,
        resource: "https://rasa.com/docs/rasa/connectors/your-own-website",
      },
    ],
  },
  {
    title: "Session 3: Deployment and Final Testing (Day 3)",
    subtasks: [
      {
        name: "Deployment and Testing",
        duration: 300,
        resource: "https://rasa.com/docs/rasa-x/deploy",
      },
      {
        name: "User Feedback and Final Deployment",
        duration: 240,
        resource: "https://rasa.com/docs/rasa/user-feedback",
      },
    ],
  },
  {
    title: "Post-Refinement (Day 4)",
    subtasks: [
      {
        name: "Feedback Loop Setup",
        duration: 120,
        resource: "https://rasa.com/docs/rasa-x/feedback",
      },
      {
        name: "Project Review",
        duration: 60,
        resource: "https://rasa.com/docs",
      },
    ],
  },
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
                </Box>
              </Box>
            );
          })}
        </Box>
      ))}
    </VStack>
  );
};

const additionalResources = [
  {
    title: "Continuous Review and Optimization",
    videos: [
      {
        title: "Rasa Algorithm Whiteboard - Rasa NLU in Depth",
        description: "This video provides an in-depth look at Rasa's NLU and how to continuously improve its performance by updating the training data and refining the model.",
      },
    ],
    links: [
      {
        title: "Rasa Masterclass Handbook: Episode 4",
        description: "This handbook complements the Rasa Masterclass video series and provides insights into training NLU models and optimizing performance.",
        url: "https://rasa.com/docs/rasa/masterclass-handbook-episode-4",
      },
      {
        title: "Rasa Studio 1.0",
        description: "This blog post introduces Rasa Studio 1.0 and outlines its capabilities for optimizing conversational AI development.",
        url: "https://blog.rasa.com/rasa-studio-1-0",
      },
    ],
  },
  // ... add other sections following the same structure ...
];

// This entire duplicate block should be removed as it is causing a redeclaration error.

export default Index;
