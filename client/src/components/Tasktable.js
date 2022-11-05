function Tasktable({
  className,
  tableHeader,
  columnHeaders,
  rowContent,
  showDoneButton,
  handleTaskDone,
  handleTaskDeleted,
}) {
  return (
    <div className={className}>
      <h3>{tableHeader}</h3>
      <table>
        <tbody>
          <tr>
            {columnHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
          {rowContent.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.type}</td>
              <td>{task.created_at}</td>
              <td>{task.deadline}</td>
              <td>
                {showDoneButton && (
                  <button type="button" onClick={() => handleTaskDone(task.id)}>
                    Done!
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleTaskDeleted(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tasktable;
