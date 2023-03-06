import React from "react";

interface Item {
  title: string;
}

interface Todos {
  todos: string[];
}

const TodoItem = (props: Item) => {
  const { title } = props;
  return (
    <>
      <li>{title}</li>
    </>
  );
};

const TodoList = (props: Todos) => {
  const { todos } = props;

  const listItems = todos.map((todo) => {
    return <TodoItem title={todo} key={todo} />;
  });

  return <ul>{listItems}</ul>;
};

export default TodoList;
