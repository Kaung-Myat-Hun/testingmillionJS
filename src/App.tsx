import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { block, For } from "million/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Todos></Todos>
    </QueryClientProvider>
  );
}

function Todos() {
  const queryClient = useQueryClient();
  const getTodos = () => {
    console.log("hello");
  };
  const postTodo = () => {
    console.log("world");
  };
  const query = useQuery("todos", getTodos);
  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  return (
    <div>
      <ul>
        <For each={query}>{({ id, title }) => <li key={id}>{title}</li>}</For>
      </ul>
      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: "Hello",
          });
        }}
      >
        Add Todos
      </button>
    </div>
  );
}

const BlockApp = block(App);

export default BlockApp;
