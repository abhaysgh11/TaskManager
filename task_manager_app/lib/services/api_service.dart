// import 'dart:convert';
// import 'package:http/http.dart' as http;
// import '../models/task.dart';


// class ApiService {
// static const String baseUrl = "http://localhost:5001";

// Future<List<Task>> getTasks() async {
//     final response = await http.get(Uri.parse("$baseUrl/tasks"));

//     if (response.statusCode == 200) {
//     final List data = jsonDecode(response.body);
//     return data.map((task) => Task.fromJson(task)).toList();
//     } else {
//     throw Exception("Failed to load tasks");
//     }
// }
// Future<void> addTask(String title) async {
// final response = await http.post(
//     Uri.parse("$baseUrl/tasks"),
//     headers: {
//     "Content-Type": "application/json",
//     },
//     body: jsonEncode({
//     "title": title,
//     }),
// );

// print("Status Code: ${response.statusCode}");
// print("Response: ${response.body}");

// if (response.statusCode != 200 && response.statusCode != 201) {
//     throw Exception("Failed to add task");
// }
// }

// Future<void> deleteTask(String id) async {
//     final response = await http.delete(
//     Uri.parse("$baseUrl/tasks/$id"),
//     );

//     if (response.statusCode != 200) {
//     throw Exception("Failed to delete task");
//     }
// }


// // Future<void> toggleTask(Task task) async {
// // final response = await http.put(
// //     Uri.parse("$baseUrl/tasks/${task.id}"),
// //     headers: {
// //     "Content-Type": "application/json",
// //     },
// //     body: jsonEncode({
// //     "title": task.title,
// //     "completed": !task.completed,
// //     }),
// // );

// // if (response.statusCode != 200) {
// //     throw Exception("Failed to update task");
// // }
// // }
// Future<void> toggleTask(Task task) async {
// try {
//     await api.toggleTask(task);
//     await loadTasks();
// } catch (e) {
//     debugPrint(e.toString());
// }
// }
// }
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/task.dart';

class ApiService {
static const String baseUrl = 'http://localhost:5001/tasks';

Future<List<Task>> getTasks() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
    final List<dynamic> data = jsonDecode(response.body);
    return data.map((json) => Task.fromJson(json)).toList();
    }
    throw Exception('Failed to load tasks');
}

Future<Task> addTask(String title) async {
    final response = await http.post(
    Uri.parse(baseUrl),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'title': title}),
    );
    if (response.statusCode == 201) {
    return Task.fromJson(jsonDecode(response.body));
    }
    final err = jsonDecode(response.body);
    throw Exception(err['error'] ?? 'Failed to create task');
}

Future<Task> toggleTask(Task task) async {
    final response = await http.put(
    Uri.parse('$baseUrl/${task.id}'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'completed': !task.completed}),
    );
    if (response.statusCode == 200) {
    return Task.fromJson(jsonDecode(response.body));
    }
    throw Exception('Failed to update task');
}

Future<void> deleteTask(String id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));
    if (response.statusCode != 204) {
    throw Exception('Failed to delete task');
    }
}
}