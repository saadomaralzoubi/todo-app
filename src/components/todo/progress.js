import { ProgressBar, Card } from "react-bootstrap";

const TopSection = ({ list }) => {
  return (
    <Card className="bg-light">
      <Card.Body>
        <Card.Title as="h2">To Do List Manager</Card.Title>
        <ProgressBar>
          <ProgressBar
            striped
            variant="success"
            now={
              list.filter((item) => item.complete).length * list.length * 100
            }
            key={1}
            label={`Completed Items: ${
              list.filter((item) => item.complete).length
            }`}
          />
          <ProgressBar
            variant="warning"
            now={
              list.filter((item) => !item.complete).length * list.length * 100
            }
            key={2}
            label={`To Do: ${list.filter((item) => !item.complete).length}`}
          />
        </ProgressBar>
      </Card.Body>
    </Card>
  );
};

export default TopSection;
