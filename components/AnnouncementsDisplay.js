
export default function AnnouncementsDisplay (props) {
  function renderAnnouncements () {
    return (props.announcements.map(a => {
      return (
        <li key={'_' + Math.random().toString(36).substr(2, 9)}>
          <div className="announcement-item">
            <span>{a.type}</span>
            <p>{a.content}</p>
          </div>
        </li>
      );
    }));
  }
  return (
    <div className="announcement-card">
      <h5>Latest Announcements</h5>
      <ul>{renderAnnouncements()}</ul>
    </div>
  );
}
