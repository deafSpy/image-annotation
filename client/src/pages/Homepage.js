import { Link } from "react-router-dom";
import "../styles/homePage.css"

export default function Homepage() {

    return (
      <>
        <img
          src='https://res.cloudinary.com/dzeil57n4/image/upload/v1713723834/p2mpfyk2trnjy9aks306.png'
          alt='image 2'
          className='image'
        />
        <div className='container'>
          <div className='innerContainer'>
            <div className='textContainer'>
                <div className='heading'>Image<br></br> Annotation</div>
                <div className='subText'>
                    Upload and Annotate your images!
                </div>
                <div className='buttonContainer'>
                  <Link to='/upload'>
                    <button className='buttonStyle'>
                        Annotate!
                    </button>
                  </Link>
                  <Link to='/gallery'>
                    <button className='buttonStyle'>
                        View Gallery
                    </button>
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </>
  );
}

