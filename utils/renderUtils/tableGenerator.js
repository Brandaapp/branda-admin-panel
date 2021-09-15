export default function createTable(style, labels, rows) {
  return (
    <table style={style}>
      <thead>
        <tr>
          {labels.map(label => <th>{label}</th>)}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
