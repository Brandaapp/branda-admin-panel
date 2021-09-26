export default function createTable(style, labels, rows) {
  return (
    <table style={style}>
      <thead>
        <tr>
          {labels.map((item) => (
            <th key={item.key}>{item.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
