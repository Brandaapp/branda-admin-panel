export default function createTable(style, labels, rows) {
  return (
    <table style={style}>
      <thead>
        <tr>
          {labels.map(label => <th key={label}>{label}</th>)}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
