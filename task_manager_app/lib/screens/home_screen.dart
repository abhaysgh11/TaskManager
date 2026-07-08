import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../models/task.dart';

class HomeScreen extends StatefulWidget {
const HomeScreen({super.key});

@override
State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
final ApiService api = ApiService();

final TextEditingController taskController = TextEditingController();

List<Task> tasks = [];
bool loading = true;

@override
void initState() {
    super.initState();
    loadTasks();
}

Future<void> loadTasks() async {
    try {
    final data = await api.getTasks();

    setState(() {
        tasks = data;
        loading = false;
    });
    } catch (e) {
    debugPrint(e.toString());

    setState(() {
        loading = false;
    });
    }
}

Future<void> addTask() async {
    if (taskController.text.trim().isEmpty) return;

    try {
    await api.addTask(taskController.text.trim());

    taskController.clear();

    await loadTasks();
    } catch (e) {
    debugPrint(e.toString());
    }
}

Future<void> toggleTask(Task task) async {
    try {
    await api.toggleTask(task);
    await loadTasks();
    } catch (e) {
    debugPrint(e.toString());
    }
}

Future<void> deleteTask(String id) async {
    try {
    await api.deleteTask(id);
    await loadTasks();
    } catch (e) {
    debugPrint(e.toString());
    }
}

@override
Widget build(BuildContext context) {
    return Scaffold(
    appBar: AppBar(
        title: const Text("Task Manager"),
        centerTitle: true,
    ),
    body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
        children: [
            Row(
            children: [
                Expanded(
                child: TextField(
                    controller: taskController,
                    decoration: const InputDecoration(
                    hintText: "Enter Task",
                    border: OutlineInputBorder(),
                    ),
                ),
                ),
                const SizedBox(width: 10),
                ElevatedButton(
                onPressed: addTask,
                child: const Text("Add"),
                ),
            ],
            ),

            const SizedBox(height: 20),

            Expanded(
            child: loading
                ? const Center(
                    child: CircularProgressIndicator(),
                    )
                : tasks.isEmpty
                    ? const Center(
                        child: Text("No Tasks"),
                        )
                    :RefreshIndicator(
                            onRefresh: loadTasks,
                            child :ListView.builder(
                        itemCount: tasks.length,
                        itemBuilder: (context, index) {
                            final task = tasks[index];

                            return Card(
                            child: ListTile(
                                leading: Checkbox(
                                    value: task.completed,
                                    onChanged: (_) {
                                        toggleTask(task);
                                    },
                                    ),
                                title: Text(task.title),
                                trailing: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                    ElevatedButton(
                                        onPressed: () async {
                                            await toggleTask(task);
                                        },
                                        child: const Text("Mark"),
                                        ),
                                    const SizedBox(width: 8),
                                    ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.red,
                                    ),
                                    onPressed: () async {
                                        await deleteTask(task.id);
                                    },
                                    child: const Text("Delete"),
                                    ),
                                ],
                                ),
                            ),
                            );
                        },
                        ),
                    ),    
            ),
        ],
        ),
    ),
    );
}
}