import AddTodoForm from "@/components/AddTodoForm";

interface Todo {
  title: string;
  completed: boolean;
  description: string;
}

async function getTodos(): Promise<Todo[]> {
  try {
    const res = await fetch("http://localhost:3000/todos", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="font-sans">
      <main className="w-full max-w-2xl px-8 py-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>

        <div className="mb-8">
          <AddTodoForm />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Todos</h2>
          {todos.length === 0 ? (
            <p className="text-gray-500">No todos found.</p>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo, index) => (
                <li
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                      className="mt-1 h-5 w-5"
                    />
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${todo.completed ? "line-through text-gray-500" : ""}`}
                      >
                        {todo.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{todo.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
