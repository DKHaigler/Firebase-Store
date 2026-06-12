export const emitTeamUpdate = () => {
  window.dispatchEvent(new Event("team-updated"));
};

export const emitTasksUpdate = () => {
  window.dispatchEvent(new Event("tasks-updated"));
};