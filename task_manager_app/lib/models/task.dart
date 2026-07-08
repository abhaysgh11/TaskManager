class Task {final String id;
            final String title;
            final bool completed;
            final String createdAt;
            final String updatedAt;

Task({
    required this.id,
    required this.title,
    required this.completed,
    required this.createdAt,
    required this.updatedAt
});

factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
    id: json["id"],
    title: json["title"],
    completed: json["completed"],
    createdAt: json["createdAt"],
    updatedAt: json["updatedAt"],
    );
}
}