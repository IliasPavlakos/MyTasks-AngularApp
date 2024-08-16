import {Injectable, signal} from "@angular/core";

import {Task, TaskStatus} from "./task.model";
import {LoggingService} from "../logging.service";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  constructor(private loggingService: LoggingService) {}

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN'
    }
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);

    this.loggingService.log('Added task with id ' + newTask.id);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((tasks) => tasks.map((task) => task.id === taskId ? {...task, status: newStatus} : task));

    this.loggingService.log('Updated task with id ' + taskId);
  }
}
