// ============================================================================
// Zone4Flow - LocalStorage Persistence Service
// ============================================================================

const USERS_KEY = 'zone4flow_users';
const CURRENT_USER_KEY = 'zone4flow_current_user';
const TASKS_PREFIX = 'zone4flow_tasks_';

export const storage = {
  // --- USERS MANAGEMENT ---
  getUsers() {
    try {
      const data = localStorage.getItem(USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading users from storage:', e);
      return [];
    }
  },

  saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to storage:', e);
    }
  },

  // --- SESSION MANAGEMENT ---
  getCurrentUser() {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading current user session:', e);
      return null;
    }
  },

  setCurrentUser(user) {
    try {
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error('Error updating current user session:', e);
    }
  },

  // --- USER TASKS ISOLATION ---
  getTasksForUser(userId) {
    if (!userId) return [];
    try {
      const data = localStorage.getItem(`${TASKS_PREFIX}${userId}`);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`Error reading tasks for user ${userId}:`, e);
      return [];
    }
  },

  saveTasksForUser(userId, tasks) {
    if (!userId) return;
    try {
      localStorage.setItem(`${TASKS_PREFIX}${userId}`, JSON.stringify(tasks));
    } catch (e) {
      console.error(`Error saving tasks for user ${userId}:`, e);
    }
  }
};
