import EmptyBlock from '../components/EmptyBlock';
import Container from '../components/content/Container';
import Row from '../components/content/Container';
import Col from '../components/content/Col';

export const createComp = {
    'EmptyBlock': id => <EmptyBlock id={id} />,
    'Container': id => <Container id={id} />,
    'Row': id => <Row id={id} />,
    'Col': id => <Col id={id} />
}