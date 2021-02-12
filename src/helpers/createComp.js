import Row from '../components/content/Row';
import Container from '../components/content/Container';

export const createComp = {
    'Row': id => <Row id={id} />,
    'Container': id => <Container id={id} />
}