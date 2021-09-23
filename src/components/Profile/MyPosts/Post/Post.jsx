import css from './Post.module.css';
import imgPost from './post.jpeg';

function Post(props) {
  return (
    <div className={css.postWrapper}>
      <img src={imgPost} alt="imgPost" className={css.image}/>
      <p>#{props.numberPost}: {props.id}</p>
      {/* <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam esse est ipsam harum, facere, aspernatur, recusandae optio ipsum laudantium saepe nisi ut. Iste, asperiores eveniet architecto, corporis ut, impedit culpa obcaecati sapiente dicta aliquam ad officia et pariatur perferendis magnam porro! Distinctio minima sapiente quidem ut quam fugiat accusantium temporibus minus recusandae magni aut ad libero laboriosam facere consectetur, error optio, velit corporis! Numquam praesentium asperiores pariatur laudantium veniam inventore cum architecto dicta, eligendi eius. Atque officia, earum veniam illo distinctio consectetur numquam nam cumque omnis perspiciatis temporibus, voluptate quasi!
      </p> */}
      <p>M: {props.message}</p>
    </div>
  )
}

export default Post;