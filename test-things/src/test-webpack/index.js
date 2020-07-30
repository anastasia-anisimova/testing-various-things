import Post from './post';
import './styles.css';
import img from './test-img.png';

const post = new Post('test', img);

console.log(post.toString());
