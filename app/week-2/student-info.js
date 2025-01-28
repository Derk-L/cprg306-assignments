export default function StudentInfo(props) {
    return (
      <section>
        <p>Name: {props.name}</p>
        <p>Github:{props.git}</p>
      </section>
    );
  }