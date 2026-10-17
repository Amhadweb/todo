type Task = {
  id: number;
  title: string;
  done: boolean;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getTasks(): Promise<Task[]> {
    const res = await fetch(`${this.baseUrl}/tasks`);
    return res.json();
  }

  async addTask(title: string): Promise<Task> {
    const res = await fetch(`${this.baseUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: title }),
    });
    return res.json();
  }
}

export const api = new ApiClient("/api");