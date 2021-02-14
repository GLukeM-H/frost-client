import Container from '../components/content/Container';
import Row from '../components/content/Container';
import EmptyBlock from '../components/EmptyBlock';

export const createComp = {
    'EmptyBlock': id => <EmptyBlock id={id} />,
    'Row': id => <Row id={id} />,
    'Container': id => <Container id={id} />
}