import type { Todo } from "./types.ts";

export let data: Todo[] = [
  {
    id: "e41b9f9b-2d90-4b8e-b81a-5ab1f9b29701",
    title: "Create Infinite Loading Screen",
    description:
      "Implement a loader that never finishes, just spins forever to test user patience and UI timeouts.",
    completed: false,
    createdAt: new Date(Date.now() - 7 * 60000),
    updatedAt: new Date(Date.now() - 7 * 60000),
  },
  {
    id: "df8ee697-110a-4cd3-b6a9-e5e7f6fd4c1b",
    title: "Add Random Logout Trigger",
    description:
      "Once every few hours, log out a random user for no reason. Leave no trace in logs.",
    completed: false,
    createdAt: new Date(Date.now() - 6 * 60000),
    updatedAt: new Date(Date.now() - 6 * 60000),
  },
  {
    id: "4cc25b3d-25dd-4f45-8c2e-d046cb4e4fef",
    title: "Implement Misleading Error Messages",
    description:
      "Replace all errors with vague messages like 'Something happened… or didn't.'",
    completed: false,
    createdAt: new Date(Date.now() - 5 * 60000),
    updatedAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: "dd95af68-1503-44ed-80b9-1427e4e1e8e8",
    title: "Deploy Sneaky UI Shift",
    description:
      "Move frequently used buttons 10px to the left at random intervals to cause accidental clicks.",
    completed: false,
    createdAt: new Date(Date.now() - 4 * 60000),
    updatedAt: new Date(Date.now() - 4 * 60000),
  },
  {
    id: "a03a9844-1f2d-4a52-8d99-7d30ba3b9cda",
    title: "Introduce Fake Progress Bars",
    description:
      "Make all progress bars jump from 0% to 90%, stay there for minutes, then finish instantly.",
    completed: false,
    createdAt: new Date(Date.now() - 3 * 60000),
    updatedAt: new Date(Date.now() - 3 * 60000),
  },
  {
    id: "f04d2c50-aee9-492e-89af-32c6af6008fe",
    title: "Auto-Correct Usernames",
    description:
      "Whenever a user enters a username, autocorrect it to something slightly embarrassing.",
    completed: false,
    createdAt: new Date(Date.now() - 2 * 60000),
    updatedAt: new Date(Date.now() - 2 * 60000),
  },
  {
    id: "742ca99f-788d-4bfa-86e8-cfc7b3c2646a",
    title: "Add Phantom Notifications",
    description:
      "Show a notification badge with no actual notifications behind it. Let users suffer.",
    completed: false,
    createdAt: new Date(Date.now() - 1 * 60000),
    updatedAt: new Date(Date.now() - 1 * 60000),
  },
  {
    id: "e6bbfc80-90f7-49f0-b9fa-0c5cc30c7d1f",
    title: "Corrupt One Pixel",
    description:
      "Randomly change one pixel in the UI each day and never document it. Cause long-term existential dread.",
    completed: false,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];
