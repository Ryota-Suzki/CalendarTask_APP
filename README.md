# CalendarTask_APP

## App.js
1. カレンダーとタスク管理アプリのメインコンポーネントである `App` コンポーネントを定義しています。
2. `useState` フックを使用して、`events` と `tasks` ステート変数を作成し、イベントとタスクのデータを格納しています。
3. `useEffect` フックを使用して、コンポーネントがマウントされたときに `fetchEvents` と `fetchTasks` 関数を呼び出し、データを取得しています。
4. `createTheme` を使用して、`ThemeProvider` でアプリケーションのテーマを作成しています。
5. `fetchEvents` 関数を定義して、API 経由でイベントデータを取得し、`events` ステート変数に格納しています。また、重要度に応じた色をイベントに適用しています。
6. `fetchTasks` 関数を定義して、API 経由でタスクデータを取得し、`tasks` ステート変数に格納しています。
7. `handleEventSelect` 関数を定義して、カレンダーのイベント（タスク）を選択した際に呼び出されるハンドラーです。選択されたタスクを `selectedTask` ステート変数にセットし、編集画面を表示します。
8. `handleDateSelect` 関数を定義して、カレンダーの日付を選択した際に呼び出されるハンドラーです。新しいタスクを作成し、`tasks` ステート変数に追加します。
9. `handleTaskAdd` 関数を定義して、新しいタスクを追加するためのハンドラーです。API 経由でタスクを作成し、`fetchTasks` と `fetchEvents` 関数を呼び出してデータを更新します。
10. `handleDeleteTask` 関数を定義して、タスクを削除するためのハンドラーです。API 経由でタスクを削除し、`fetchTasks` と `fetchEvents` 関数を呼び出してデータを更新します。
11. `handleToggleComplete` 関数を定義して、タスクの完了状態を切り替えるためのハンドラーです。API 経由でタスクを更新し、`fetchTasks` と `fetchEvents` 関数を呼び出してデータを更新します。また、カレンダーの表示も更新します。
12. `handleTaskClick` 関数を定義して、タスクをクリックした際に編集画面を表示するためのハンドラーです。選択されたタスクを `selectedTask` ステート変数にセットし、編集画面を開きます。
13. `handleTaskSave` 関数を定義して、編集したタスクを保存するためのハンドラーです。API 経由でタスクを更新し、`fetchTasks` と `fetchEvents` 関数を呼び出してデータを更新します。編集画面を閉じます。
