import EmptyBlock from '../components/content/EmptyBlock';
import Container from '../components/content/Container';
import Row from '../components/content/Container';
import Col from '../components/content/Col';

export const createComp = {
    'EmptyBlock': id => <EmptyBlock key={id} id={id} />,
    'Container': id => <Container key={id} id={id} />,
    'Row': id => <Row key={id} id={id} />,
    'Col': id => <Col key={id} id={id} />
}