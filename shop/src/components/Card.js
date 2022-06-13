import { Link } from 'react-router-dom';

function Card(props) {
    return (
        <div className="col-md-4">
            <Link to={'/detail/' + (props.idx)}>
            <img src={'https://codingapple1.github.io/shop/shoes' + (props.idx + 1) + '.jpg'} alt="" width="100%" />
            <h4>{props.shoes.title}</h4>
            <p>
                {props.shoes.content} & {props.shoes.price}
            </p>
            </Link>
        </div>
    );
}

export default Card;