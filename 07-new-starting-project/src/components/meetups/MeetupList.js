import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList({ list }) {
  return (
    <ul className={classes.list}>
      {list.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          title={meetup.title}
          image={meetup.image}
          address={meetup.address}
          description={meetup.description}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
